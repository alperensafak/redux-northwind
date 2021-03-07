import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history, //history bilgisini buraya getiriyoruz. reacttan geliyor.
  ...props //bunları mevcut bu kompenentin proplarına ekledik
}) {
  const [product, setProduct] = useState({ ...props.product }); // statedeki product stateini setProduct ile set ediyoruz
  //errors diye state nesnesi olusturuyoruz. hatalır seterrors fonksiyonuyla gerceklestireceğiz
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categories.length == 0) {
      getCategories();
    }

    setProduct({ ...props.product });
  }, [props.product]); //props.product izle doma yerleştigi zaman bitir

  function handleChange(event) {
    //eventle datamızı dolduracagız
    const { name, value } = event.target; //name ve value şeklinde obje olusturduk. textboxın name ve valuesini atadık
    setProduct(previousProduct => ({
      //statedimizdeki product icin
      ...previousProduct, //onceki productı extended et. züerine yaz
      [name]: name === "categoryId" ? parseInt(value, 10) : value, //onceki productın name e eşit olan özelliğini, category ıd alanı verse degeri integera cevir.categoryıd degilse valueyi oldugu gibi bas
    }));

    validate(name, value);
  }
  function validate(name, value) {
    if (name === "productName" && value === "") {
      setErrors(previousErrors => ({
        ...previousErrors,
        productName: "Product name necesssary",
      }));
    } else {
      setErrors(previousErrors => ({
        ...previousErrors,
        productName: "",
      }));
    }
  }

  function handleSave(event) {
    event.preventDefault(); // sayfanmın reflesh olmasını engeller
    saveProduct(product).then(() => history.push("/")); //onceki geldiğimiz sayfalara yonlerdirme yapmak için kulllanabileceğimiz yöntem
  }
  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    ></ProductDetail>
  );
}

export function getProductById(products, productId) {
  //export diyince farklı yerde de kullanabiliriz, productId bulunmak istenen productın idsi
  let product = products.find(product => product.id == productId || null); // productınidsi gonderilen id ile eşitse ona ata yoksa null ata
  return product; //== string int esitleyebiliyorsun charp ve javada string int ayrı
}

function mapStateToProps(state, ownProps) {
  //ownProbs compenentin kendi icindeki props
  const productId = ownProps.match.params.productId; //git parametrelere bak product ıdyi cek
  const product = //diyelim ki guncelleme. guncellenmeye calısan productı set ediyoruz
    productId && state.productListReducer.length > 0 //statedeki ürünler icinden bu urunu buluyoruz
      ? getProductById(state.productListReducer, productId) //statedeki product reducuru ve idyi gondereyim. bu productı bana ver
      : {}; //ilk urun yeni ekleniyor.
  return {
    //mevcut statetimiz olusturuyorz
    product, //state product, products, categories ekliyoruz
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct, //reduxa gidip ordaki operasyonlara bakıp bunları çekti
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
