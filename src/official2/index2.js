/**
 * File : index2.js
 * Todo : 确定最小（但完备）UI state表达
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
            <div className="row">
                <div className="col-lg-12">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead><tr><th>Name</th><th>Price</th></tr></thead>
                            <tbody>{rows}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});


var SearchBar = React.createClass({
    render : function(){
        return (
            <div className="row">
                <div className="col-lg-12">
                    <form className="form-horizontal" rol="form">
                        <div className="form-group">
                            <input type="text" placeholder="Search..." className="form-control" value={this.props.filterText}/>
                        </div>
                        <div className="form-group">
                            <label className="checkbox-inline">
                                <input type="checkbox" checked={this.props.inStockOnly}/>
                                {' '}
                                Only show products in stock
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});

var FilterableProductTable = React.createClass({
    getInitialState : function() {
        return {
            filterText : 'ldddd',
            inStockOnly : true
        }
    },
    render : function(){
        return (
            <div>
                <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
                <ProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
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