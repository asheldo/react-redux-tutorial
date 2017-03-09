let comments = [
    {id: 1, author: "Cory Brown", text: "My 2 scents"},
    {id: 2, author: "Jared Anderson", text: "Let me put it this way. You've heard of Socrates? Aristotle? Plato? Morons!"},
    {id: 3, author: "Matt Poulson", text: "It's just a function!"},
    {id: 4, author: "Bruce Campbell", text: "Fish in a tree? How can that be?"},
    {id: 5, author: "Tim Riker", text: "So what we're learning is to keep our componets dumb?"}
];

const { createClass, PropTypes } = React;
const { createStore } = Redux;
const { Provider } = ReactRedux;

const Comment = (props) => (
    <div className="comment">
        <h2 className="commentAuthor">
            { props.author }
        </h2>
        { props.children }
    </div>
);

const CommentList = function (props, context) {
    return (
    <div className="commentList">
        { props.comments.map(comment => (
            <Comment author={ comment.author } key={comment.id} >
                { comment.text }
            </Comment>
        )) }
    </div>
);};

const nextLine = ({lines, line, word, num, ct}) => {
      console.log("num: " + num)
    const newLen = line.length + 1 + word.length
    console.log("newLen: " + newLen)
    if (newLen <= ct) {
      lines[num - 1] = line + " " + word
    } else {
      lines[num] = word
    }
    return lines
}
const wrapReduce = (lines, word) => { // ct,
  const num = lines.length
  const ct = 10
  // console.log(lines)
  const line = lines[num - 1]
  console.log(num + ", " + line + " + " + word)
  return nextLine({lines, line, word, num, ct })
   // || addWord(arr) > ct)
}
const wordWrap = (text, ct) => {
    return text.trim().split(" ").reduce(wrapReduce, // .bind(ct),
      [""])
}

const CommentForm = (props) => (
    <form className="commentForm"
          onSubmit={ (e) => {
              e.preventDefault();
              props.onCommentSubmit();
          }}
    >
        <input type="text"
               name="author"
               placeholder="Your name"
               value={ props.author }
               onChange={ (e) =>
                   props.onAuthorChange(e.target.value) }
        />
        <textarea name="text"
               placeholder="Say something..."
               value={ props.text }
               onChange={ (e) =>

                   props.onTextChange(e.target.value) }
        />

        <button>Post</button>

        <span id="wrapText">{ props.texts[props.texts.length - 1] }</span>

    </form>
);

const CommentFormWrap = (props) => (
    <form className="commentForm"
          onSubmit={ (e) => {
              e.preventDefault();
              props.onCommentSubmit();
          }}
    >
        <input type="text"
               name="author"
               placeholder="Your name"
               value={ props.author }
               onChange={ (e) =>
                   props.onAuthorChange(e.target.value) }
        />
        <input type="text"
               name="text"
               placeholder="Say something..."
               value={ props.text }
               onChange={ (e) =>
                   props.onTextChange(e.target.value) }
        />
        <button>Post</button>
    </form>
);


const CommentBox = createClass({
    contextTypes: {
        store: PropTypes.object
    },
    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe( () => this.forceUpdate() )
    },
    componentWillUnmount() {
        this.unsubscribe();
    },
    render() {
        const { items, author, text } = this.context.store.getState();
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList comments={ items } />
                <CommentForm
                    author={ author }
                    text={ text }
                    texts={ wordWrap(text, 10) }

                    onCommentSubmit={ () =>
                        dispatch(addComment({author, text})) }

                    onAuthorChange={ (author) =>
                        dispatch(authorChange(author)) }

                    onTextChange={ (text) =>
                        dispatch(textChange(text))}
                />
            </div>
        );
    }
});

const actions = {
    ADD_COMMENT:    Symbol('ADD_COMMENT'),
    AUTHOR_CHANGE:  Symbol('AUTHOR_CHANGE'),
    TEXT_CHANGE:     Symbol('TEXT_CHANGE')
};

const addComment = (comment) => ({
    type: actions.ADD_COMMENT,
    comment
});

const authorChange = (author) => ({
    type: actions.AUTHOR_CHANGE,
    author
});

const textChange = (text) => ({
    type: actions.TEXT_CHANGE,
    text
});

const commentsReducer = (state={
    items:[],
    author:'',
    text: ''
}, action) => {
    switch (action.type) {
        case actions.ADD_COMMENT:
        return { ...state,
            items: [...state.items, {id: Math.random(), ...action.comment}] };

        case actions.AUTHOR_CHANGE:
        return { ...state, author: action.author };

        case actions.TEXT_CHANGE:
        return { ...state, text: action.text };

        default:
        return state;
    }
};

const store = createStore(commentsReducer);
const { getState, dispatch } = store;
comments.map(comment => dispatch( addComment(comment) ));
console.log(getState());

ReactDOM.render(
    <Provider store={ store }>
        <CommentBox />
    </Provider>,
//    document.querySelector('#content')
    document.getElementById('content')
);
