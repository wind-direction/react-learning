/**
 * File : tutorial1.js
 * Todo :
 * Created by wind on 17/1/17.
 */
var CommentBox = React.createClass({
    render : function(){
        return (
            <div class="commentBox">
                Hello, world! I am a CommentBox.
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox />,
    document.getElementById('content')
);