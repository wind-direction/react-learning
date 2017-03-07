/**
 * File : tutorial6.js
 * Todo : 对应官方教程tutorial8.js。挂钩数据模型
 * Created by wind on 17/1/17.
 */

var data = [
    { id : 1, author : 'wind test1', text : '这是tutorial8.js中的测试评论，用于挂钩数据模型'},
    { id : 2, author : 'wind test2', text : '这是tutorial8.js中的测试评论，用于挂钩数据模型，并展示markdown的语法*hello markdown*'}
];

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
    render : function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data}/>
                <CommentForm />
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox data={data}/>,
    document.getElementById('content')
);