/**
 * File : tutorial2.js
 * Todo :
 * Created by wind on 17/1/17.
 */
var CommentList = React.createClass({
    render : function(){
        return (
            <div className="commentList">
                hello, world! I am a CommentList.
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
                <CommentList />
                <CommentForm />
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox />,
    document.getElementById('content')
);