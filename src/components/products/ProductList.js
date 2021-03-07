import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Table, Button } from "reactstrap";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

class ProductList extends Component {
  componentDidMount() {
    // uygulama açıldıgında çağırıyoruz productları
    this.props.actions.getProducts();
  }

  addToCart = product => {
    // NEDEN BBAŞKA BİR AKSİYON YAZMALIYIZ BAŞTA? sonradan yapacaıgımız modifakasyonlar ıcın

    this.props.actions.addToCart({ quantity: 1, product }); //cartItem gonderıyoruz
    alertify.success(product.productName + " added to cart.");
  };
  render() {
    return (
      <div>
        <h2>
          <Badge color="warning">Products</Badge>{" "}
          <Badge color="success">
            {this.props.currentCategory.categoryName}
          </Badge>
        </h2>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity Per Unit</th>
              <th>Units In Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(product => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>
                  <Link to={"/saveproduct/"+product.id}>{product.productName}</Link>
                </td>
                <td>{product.unitPrice}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
                <td>
                  <Button
                    color="success"
                    onClick={() => this.addToCart(product)}
                  >
                    Add
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer, // statededki product list reducera bağla. artık bu componentin propslarında products var. bu da reduxtan gelen data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch), //proplara bağla aksiyonu
      addToCart: bindActionCreators(cartActions.addToCart, dispatch), //reduxtaki addToCart aksiyonuna erişebilirim
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
