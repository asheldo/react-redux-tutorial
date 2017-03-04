/** Imports */

const { createClass, PropTypes } = React;
const { createStore } = Redux;
const { Provider } = ReactRedux;

/** Model */
// see data/hus.js

/** Actions */

const actions = {
                  CHOOSE_SOURCE:  Symbol('CHOOSE_SOURCE'),
                  ADD_SOURCE:     Symbol('ADD_SOURCE'),
                  ADD_WORD:       Symbol('ADD_WORD'),
                  ADD_COMMENT:    Symbol('ADD_COMMENT'),
                  AUTHOR_CHANGE:  Symbol('AUTHOR_CHANGE'),
                  TEXT_CHANGE:    Symbol('TEXT_CHANGE'),
                  AUTHOR_SELECT:  Symbol('AUTHOR_SELECT')
                };

/* const chooseSourceCmd
   = (source) => ({ type: actions.CHOOSE_SOURCE, source });
   const authorSelectCmd = (author) => ({ type: actions.AUTHOR_SELECT, author }) */
const addSourceCmd = (source) => ({ type: actions.ADD_SOURCE, source });
const addWordCmd = (word) => ({ type: actions.ADD_WORD, word });
//
const addCommentCmd = (comment) => ({ type: actions.ADD_COMMENT, comment });
// const authorChangeCmd = (author) => ({ type: actions.AUTHOR_CHANGE, author });

/** Load Model after Redux */

const stubData = (store) => {
  /** airbnb says no-iterators...
   *  Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.
   *  Use `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / ... to iterate over arrays, and `Object.keys()` / `Object.values()` / `Object.entries()` to produce arrays so you can iterate over objects.
   * buuuut...
   *  side-effects?? (for instead of map seems more expressive of mutability) */
  empiricalData().wordSources.forEach( (source) => store.dispatch(addSourceCmd(source)) )
  empiricalData().sourceWords.forEach( (word) => store.dispatch(addWordCmd(word)) )
  empiricalData().sourceWordComments.forEach( (comment) => store.dispatch(addCommentCmd(comment)) )
}

/** Views */

const Comment = (props) => (
    <div className="comment">
        <h4 className="commentAuthor">{ props.author }</h4>
        <div>{ props.children /* elements */ }</div>
        <br/>
    </div>
);
const CommentList = function (props, context) {
    return (
    <div className="commentList">
        { props.comments.map(({author, id, text, word}) => (
            <Comment author={ author } key={ id } >
                { text + " " + word }
            </Comment>
        )) }
    </div>
  );};

/** From sources, list */
const sourceOption = ({id, title, lang}) =>
 (<option key={ id } value={ id } >{ title }</option>)
// stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option
const SourceSelect = (props, context) => (
    <div className="sources">Source:&nbsp;
      <select className="sources"
        onChange={ (e) => { props.onSourceChange && props.onSourceChange(e.target.value) } }
        >{ props.sources.map(sourceOption) }</select>
    </div>
  );

const sourceWordOption = ({id, oe, en}) =>
  (<option key={ id } value="{ en }" >{ oe }</option>)
const sourceWordOptions = ({source, words}) =>
    (!words) ? [ sourceWordOption({id: 0, oe:"xx", en:"xxx"}) ]
      : words.filter((word) => word.sourceId == source.id).map(sourceWordOption)
const SourceWordSelect = (props, context) => (
    <div className="sourceWords">Word:&nbsp;
      <select className="sourceWords">{ sourceWordOptions(props) }</select>
    </div>
);

/** From comments, pull out distinct authors to map from */
const commentorSet = (comments) => new Set(comments.map((c) => c.author))
const commentorOption = (author, ix) =>
 (<option key={ ix } value={ author } >{ author }</option>)
const CommentorSelect = (props, context) => (
    <div className="commentor">Commentator:&nbsp;
      <select className="commentor"
        // unused
         value={ props.commentor ? props.commentor : "0" }
         onChange={
           (e) => { props.onCommentorChange && props.onCommentorChange(e.target.value) }
         }><option key="0" value=""></option>{
          Array.from(commentorSet(props.comments), commentorOption)
      }</select>
    </div>
);

const CommentForm = (props) => (
    <form className="commentForm"
          onSubmit={ (e) => {
            e.preventDefault();
            const author = e.target.querySelector("input[name='author']").value
            const text = e.target.querySelector("input[name='text']").value
            props.onCommentSubmit( {author, text} );
          }} >
        <input type="text" name="author" placeholder="Your name" />
        <input type="text" name="text" placeholder="Say something..." />
        <button>Post</button>
    </form>
);

/** Main Components */
const WordSourceBox = createClass({
    contextTypes: { store: PropTypes.object }, // STATE type 1 & maybe 2
    /** getChildContext() { return { source: { } } },
     childContextTypes: { // type 3 // source: PropTypes.object },
     */
    componentDidMount() {
        this.unsubscribe = this.context.store.subscribe( () => this.forceUpdate() )
    },
    // GLOBAL state
    componentWillUnmount() { this.unsubscribe(); },
    getInitialState: function() {
      const { sources } = this.context.store.getState()
      return { source: sources.filter((s) => (s.id == 1))[0], commentor: "" }
    },
    // Control state
    onSourceChange: function(sourceId) {
      const { sources } = this.context.store.getState()
      this.setState({ source: sources.filter((s) => (s.id == sourceId))[0] })
    },
    onCommentorChange: function(newState) {
      this.setState( { commentor: newState })
    },
    render() {
        const { dispatch, getState } = this.context.store
        const { sources, sourceWords, sourceWordComments, /* author, text */  } = getState();
        /*
         * author is last posted comment author
         * commentor is the author list is filtered on
         * equal after a "post"
         */
        const { source, commentor, newComment, author } = this.state; // Control state, local (type 3)
        return (
            <div className="commentBox">
                <h1>Word-Hus</h1>
                <SourceSelect sources={ sources }
                  onSourceChange={ this.onSourceChange } />
                <SourceWordSelect source={ source }
                  words={ sourceWords } />

                <CommentorSelect comments={ sourceWordComments } commentor={ commentor }
                  onCommentorChange={ this.onCommentorChange }/>
                <CommentList comments={
                     (commentor=="") ? sourceWordComments
                      : sourceWordComments.filter((comment) => comment.author == commentor)
                  } />
                <CommentForm
                    author={ author }
                    /*
                    text={ text }
                    onAuthorChange={ (a) => dispatch(authorChangeCmd(a)) }
                    onTextChange={ (t) => dispatch(textChangeCmd(t)) }
                     */
                    // ?? NEED TO FIX THIS, LOCAL V. GLOBAL (pull out author,text?)
                    onCommentSubmit= { (newComment) => {
                      // const newComment = {author, text}
                      // this.setState({commentor: author}) // local state
                      dispatch(addCommentCmd(newComment))
                      // TODO Make CommentList manage this...
                      this.onCommentorChange(newComment.author)
                    }}

                />
            </div>
        );
    }
});

/** Interface to Store */
const commentsReducer = (state={
    sources:[],
    sourceWords:[],
    sourceWordComments:[],

    // items:[],

    author:'',
    text: ''
}, action) => {
    switch (action.type) {
        case actions.ADD_SOURCE:
        return { ...state,
            sources: [...state.sources, {id: Math.random(), ...action.source}] };
        case actions.ADD_WORD:
        return { ...state,
            sourceWords: [...state.sourceWords, {id: Math.random(), ...action.word}] };

        case actions.ADD_COMMENT:
        return { ...state,
            sourceWordComments: [...state.sourceWordComments, {id: Math.random(), ...action.comment}] };

        case actions.AUTHOR_CHANGE:
        return { ...state, author: action.author };

        case actions.TEXT_CHANGE:
        return { ...state, text: action.text };

        default:
        return state;
    }
};

// Redux store
const store = createStore(commentsReducer);
stubData(store)
// React-Redux application
ReactDOM.render(
    <Provider store={ store }>
        <WordSourceBox />
    </Provider>, document.getElementById('content') // document.querySelector('#content')
);
