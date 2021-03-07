import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Badge } from "reactstrap";
import * as productActions from "../../redux/actions/productActions";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }
  selectCategory = category => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id); //secili categonin idsini parametre olarak yolladık
  };

  render() {
    return (
      <div>
        <h3>
          {" "}
          <Badge color="warning">Categories</Badge>
        </h3>

        <ListGroup>
          {this.props.categories.map(category => (
            <ListGroupItem
              active={category.id === this.props.currentCategory.id}
              onClick={() => this.selectCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
//state storedaki state. state parametresiyle geliyor
function mapStateToProps(state) {
  //secili kategoriyi buraya baglıyoruz. map et bagla bu compenentin proplarına belirlediğimiz bir statei bagla
  return {
    currentCategory: state.changeCategoryReducer, //currentCategory obje nesnem var. onu state listesindeki changeCategoryReducera bagla.
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ), //proplara bağla aksiyonu
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getProducts, dispatch), //product actionstan gelen aksiyon
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList); //connect fonksiyonu sonucu ortaya cıkan sonucu export ediyoruz
//connect fonksiyon döndürüyor categoryList parametre olarak gonderiyoruz
