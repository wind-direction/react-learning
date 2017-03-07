/**
 * File : index.js
 * Todo : 搭建一个检索列表的app
 * Created by wind on 17/1/17.
 */

var ProductCategoryRow = React.createClass({
    render : function() {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
});

var ProductRow = React.createClass({
    render : function(){
        var name = this.props.product.stocked ? this.props.product.name : <span style={{color : 'red'}}>{this.props.product.name}</span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
});

var ProductTable = React.createClass({
    render : function(){
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product) {
            if(product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
        //渲染
        return (
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead><tr><th>Name</th><th>Price</th></tr></thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
});


var SearchBar = React.createClass({
    render : function(){
        return (
            <form className="form-horizontal">
                <div className="form-group">
                    <input type="text" placeholder="Search..." className="form-control"/>
                </div>
                <div className="form-group">
                    <label className="checkbox-inline">
                        <input type="checkbox" />
                        {' '}
                        Only show products in stock
                    </label>
                </div>
            </form>
        );
    }
});

var FilterableProductTable = React.createClass({
    render : function(){
        return (
            <div>
                <SearchBar />
                <ProductTable products={this.props.products} />
            </div>
        );
    }
});

var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('container')
);




