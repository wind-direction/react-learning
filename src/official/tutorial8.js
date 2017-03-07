/**
 * File : tutorial8.js
 * Todo : 对应官方教程tutorial14.js。定时从服务器获取数据
 * Created by wind on 17/1/17.
 */
var Comment = React.createClass({
    rawMarkup : function(){
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html : rawMarkup }
    },
    render : function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
            </div>
        );
    }
});

var CommentList = React.createClass({
    render : function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            )
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});


var CommentForm = React.createClass({
    render : function() {
        return (
            <div className="commentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
});


var CommentBox = React.createClass({
    loadCommentsFromServer : function(){
        $.ajax({
            url : this.props.url,
            dataType : 'json',
            cache : false,
            success : function(data) {
                this.setState({data : data});
            }.bind(this),
            error : function(xhr, status, err) {
                console.error(this.props.url, status, err.toString() );
            }.bind(this)
        });
    },
    getInitialState : function(){
        return {data : []};
    },
    componentDidMount : function(){
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render : function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm />
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox url="../../api/comments.php" pollInterval={2000}/>,
    document.getElementById('content')
);