/**
 * File : tutorial9.js
 * Todo : 对应官方教程tutorial15.js。添加新的评论
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
    getInitialState : function(){
        return { author : '', text : ''};
    },
    handleAuthorChange : function(e){
        this.setState({author : e.target.value});
    },
    handleTextChange : function(e){
        this.setState({text: e.target.value});
    },
    handleSubmit : function(e){
        e.preventDefault();
        var author = this.state.author.trim(),
            text = this.state.text.trim(),
            args  = { author : author, text : text };
        if( !text || !author ) {
            alert('用户名和评论内容不能为空!');
        }else{
            $.ajax({
                url : this.props.url,
                type : 'post',
                data : args,
                dataType : 'json',
                success : function(json){
                    this.props.onCommentSubmit(json);
                    this.setState({author : '', text : ''});
                }.bind(this),
                error : function(xhr,status, err){
                    console.error(this.props.url, status, err.toString() );
                }.bind(this)
            });
        }
    },
    render : function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange}/>
                <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange}/>
                <input type="submit" value="Post" />
            </form>
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
                var aimData = this.state.data.concat(data);
                this.setState({data : aimData});
            }.bind(this),
            error : function(xhr, status, err) {
                console.error(this.props.url, status, err.toString() );
            }.bind(this)
        });
    },
    handleCommentSubmit : function(appendData){
        //提交到服务器并刷新列表
        var data = this.state.data;
        data.push(appendData);
        this.setState({data : data});
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
                <CommentForm onCommentSubmit={this.handleCommentSubmit} url="../../api/submit.php"/>
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox url="../../api/comments.php" pollInterval={5000}/>,
    document.getElementById('content')
);