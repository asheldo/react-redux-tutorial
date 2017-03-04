/** Imports */

const { createClass, PropTypes } = React;
const { createStore } = Redux;
const { Provider } = ReactRedux;

/** Model */
<<<<<<< HEAD
// see data/hus.js

/** Actions */
=======

const empiricalData = () => ({
  comments:  [
      {id: 1, author: "Cory Brown", text: "My 2 scents"},
      {id: 2, author: "Jared Anderson", text: "Let me put it this way. You've heard of Socrates? Aristotle? Plato? Morons!"},
      {id: 3, author: "Matt Poulson", text: "It's just a function!"},
      {id: 4, author: "Bruce Campbell", text: "Fish in a tree? How can that be?"},
      {id: 5, author: "Tim Riker", text: "So what we're learning is to keep our componets dumb?"}
  ],
  sources:  [
      {id: 1, title: "OED", lang: "OE", description: "My 2 scents",
       pages:[{page:1, lines:[{line:1, oe:"hwaet", en:"so"}]}], words:[{oe:"hwaet", en:"so"}]},
      {id: 2, title: "Beowulf", lang: "OE", description: "Let me put it this way. You've heard of Socrates? Aristotle? Plato? Morons!",
       pages:[{page:1, lines:[{line:1, oe:"hwaet", en:"so"}]}], words:[{oe:"hwaet", en:"so"}]},
      {id: 3, title: "Matt Poulson's diary", lang: "OE", description: "It's just a function!",
       pages:[{page:1, lines:[{line:1, oe:"hwaet", en:"so"}]}], words:[{oe:"hwaet", en:"so"}]},
      {id: 4, title: "Bruce Campbell' poetry", lang: "OE", description: "Fish in a tree? How can that be?",
       pages:[{page:1, lines:[{line:1, oe:"hwaet", en:"so"}]}], words:[{oe:"hwaet", en:"so"}]},
      {id: 5, title: "Tim Riker's hymn", lang: "OE", description: "So what we're learning is to keep our componets dumb?",
       pages:[{page:1, lines:[{line:1, oe:"hwaet", en:"so"}]}], words:[{oe:"hwaet", en:"so"}]}
  ]
})
>>>>>>> c9fce0d2f621a5a2727c549090e23a32e98ff8e2

const actions = {
                  CHOOSE_SOURCE:  Symbol('CHOOSE_SOURCE'),
                  ADD_SOURCE:     Symbol('ADD_SOURCE'),
<<<<<<< HEAD
                  ADD_WORD:       Symbol('ADD_WORD'),
=======
                  ADD_SOURCE_WORD:Symbol('ADD_SOURCE_WORD'),
>>>>>>> c9fce0d2f621a5a2727c549090e23a32e98ff8e2
                  ADD_COMMENT:    Symbol('ADD_COMMENT'),
                  AUTHOR_CHANGE:  Symbol('AUTHOR_CHANGE'),
                  TEXT_CHANGE:    Symbol('TEXT_CHANGE'),
                  AUTHOR_SELECT:  Symbol('AUTHOR_SELECT')
                };

<<<<<<< HEAD
/* const chooseSourceCmd
   = (source) => ({ type: actions.CHOOSE_SOURCE, source });
   const authorSelectCmd = (author) => ({ type: actions.AUTHOR_SELECT, author }) */
const addSourceCmd = (source) => ({ type: actions.ADD_SOURCE, source });
const addWordCmd = (word) => ({ type: actions.ADD_WORD, word });
//
const addCommentCmd = (comment) => ({ type: actions.ADD_COMMENT, comment });
// const authorChangeCmd = (author) => ({ type: actions.AUTHOR_CHANGE, author });
=======
/* local changes?
const addSourceWordCmd = (word) => ({ type: actions.ADD_SOURCE_WORD, word });
const chooseSourceCmd = (source) => ({ type: actions.CHOOSE_SOURCE, source });
// ?
const authorSelectCmd = (author) => ({ type: actions.AUTHOR_SELECT, author })
*/
const addSourceCmd = (source) => ({ type: actions.ADD_SOURCE, source });

// Store changes
const addCommentCmd = (comment) => ({ type: actions.ADD_COMMENT, comment });
const authorChangeCmd = (author) => ({ type: actions.AUTHOR_CHANGE, author });
const textChangeCmd = (text) => ({ type: actions.TEXT_CHANGE, text });
>>>>>>> c9fce0d2f621a5a2727c549090e23a32e98ff8e2

/** Load Model after Redux */

const stubData = (store) => {
<<<<<<< HEAD
  /** airbnb says no-iterators...
   *  Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.
   *  Use `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / ... to iterate over arrays, and `Object.keys()` / `Object.values()` / `Object.entries()` to produce arrays so you can iterate over objects.
   * buuuut...
   *  side-effects?? (for instead of map seems more expressive of mutability) */
  empiricalData().wordSources.forEach( (source) => store.dispatch(addSourceCmd(source)) )
  empiricalData().sourceWords.forEach( (word) => store.dispatch(addWordCmd(word)) )
  empiricalData().sourceWordComments.forEach( (comment) => store.dispatch(addCommentCmd(comment)) )
=======
  // airbnb says no-iterators...
  //  Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.
  //  Use `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / ... to iterate over arrays, and `Object.keys()` / `Object.values()` / `Object.entries()` to produce arrays so you can iterate over objects.
  // buuuut...
  //  side-effects?? (for instead of map seems more expressive of mutability)
  empiricalData().comments.forEach( (comment) => store.dispatch(addCommentCmd(comment)) )
  empiricalData().sources.forEach( (source) => store.dispatch(addSourceCmd(source)) )
  // console.log(stub.length) // console.log(getState().length);
>>>>>>> c9fce0d2f621a5a2727c549090e23a32e98ff8e2
}

/** Views */

const Comment = (props) => (
    <div className="comment">
<<<<<<< HEAD
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
=======
        <h2 className="commentAuthor">
            { props.author }
        </h2>
        { props.children }
    </div>
);

const CommentList = function (props, context) {
    return (
    <div className="commentList">
        { props.comments.map(({author, id, text}) => (
            <Comment author={ author } key={ id } >
                { text }
            </Comment>
        )) }
    </div>
);};
>>>>>>> c9fce0d2f621a5a2727c549090e23a32e98ff8e2

/** From sources, list */
const sourceOption = ({id, title, lang}) =>
 (<option key={ id } value={ id } >{ title }</option>)
// stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option
const SourceSelect = (props, context) => (
<<<<<<< HEAD
    <div className="sources">Source:&nbsp;
=======
    <div className="sources">
>>>>>>> c9fce0d2f621a5a2727c549090e23a32e98ff8e2
      <select className="sources"
        onChange={ (e) => { props.onSourceChange && props.onSourceChange(e.target.value) } }
        >{ props.sources.map(sourceOption) }</select>
    </div>
<<<<<<< HEAD
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
=======
>>>>>>> c9fce0d2f621a5a2727c549090e23a32e98ff8e2
);

/** From comments, pull out distinct authors to map from */
const commentorSet = (comments) => new Set(comments.map((c) => c.author))
const commentorOption = (author, ix) =>
 (<option key={ ix } value={ author } >{ author }</option>)
const CommentorSelect = (props, context) => (
<<<<<<< HEAD
    <div className="commentor">Commentator:&nbsp;
=======
    <div className="commentor">Commentor:&nbsp;
>>>>>>> c9fce0d2f621a5a2727c549090e23a32e98ff8e2
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

<<<<<<< HEAD
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
=======
const sourceWordOption = ({oe, en}) =>
 (<option key={ oe } value="{ en }" >{ oe }</option>)

const sourceWordOptions = (props) => (!props || !props.source || !props.source.words)
    ? [ sourceWordOption({oe:"xx", en:"xxx"}) ] : props.source.words.map(sourceWordOption)

const SourceWordSelect = (props, context) => (
    <div className="sourceWords">
      <select className="sourceWords">{ sourceWordOptions(props) }</select>
    </div>
);

const CommentForm = (props) => (
    <form className="commentForm"
          onSubmit={ (e) => { e.preventDefault(); props.onCommentSubmit(); }} >
        <input type="text" name="author" placeholder="Your name"
               value={ props.author }
               onChange={ (e) =>
                   props.onAuthorChange(e.target.value) } />
        <input type="text" name="text" placeholder="Say something..."
               value={ props.text }
               onChange={ (e) =>
                   props.onTextChange(e.target.value) } />
>>>>>>> c9fce0d2f621a5a2727c549090e23a32e98ff8e2
        <button>Post</button>
    </form>
);

<<<<<<< HEAD
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
=======
const WordSourceBox = createClass({
    contextTypes: {
        // type 1 & maybe 2
        store: PropTypes.object
    },
    // getChildContext() { return { source: { } } },
    // childContextTypes: { // type 3 // source: PropTypes.object },
    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe( () => this.forceUpdate() )
    },
    componentWillUnmount() {
        this.unsubscribe();
    },
    getInitialState: function() {
      const { sources } = this.context.store.getState();
      return { source: sources.filter((s) => (s.id == 1))[0], commentor: "" }
    },
    onSourceChange: function(sourceId) {
      const { sources } = this.context.store.getState();
      this.setState( { source: sources.filter((s) => (s.id == sourceId))[0] })
>>>>>>> c9fce0d2f621a5a2727c549090e23a32e98ff8e2
    },
    onCommentorChange: function(newState) {
      this.setState( { commentor: newState })
    },
    render() {
        const { dispatch, getState } = this.context.store
<<<<<<< HEAD
        const { sources, sourceWords, sourceWordComments, /* author, text */  } = getState();
        /*
         * author is last posted comment author
         * commentor is the author list is filtered on
         * equal after a "post"
         */
        const { source, commentor, newComment, author } = this.state; // Control state, local (type 3)
=======
        const { sources, items, author, text } = getState(); // Global state
        const { source, commentor, newComment } = this.state; // Control state, local (type 3)
>>>>>>> c9fce0d2f621a5a2727c549090e23a32e98ff8e2
        return (
            <div className="commentBox">
                <h1>Word-Hus</h1>
                <SourceSelect sources={ sources }
                  onSourceChange={ this.onSourceChange } />
<<<<<<< HEAD
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
=======
                <SourceWordSelect source={ source }/>

                <CommentorSelect comments={ items } commentor={ commentor }
                  onCommentorChange={ this.onCommentorChange }/>
                <CommentList comments={
                    // newComment ? items.filter((comment) => comment.author == newComment.author)
                     (commentor=="") ? items : items.filter((comment) => comment.author == commentor)
                  } />
                <CommentForm
                    author={ author }
                    text={ text }
                    onAuthorChange={ (a) => dispatch(authorChangeCmd(a)) }
                    onTextChange={ (t) => dispatch(textChangeCmd(t)) }

                    // ?? NEED TO FIX THIS, LOCAL V. GLOBAL (pull out author,text?)
                    onCommentSubmit= { () => {
                      const newComment = {author, text}
                      // this.setState({commentor: author}) // local state
                      dispatch(addCommentCmd(newComment))
                     //   .then(
                     // TODO Make CommentList manage this...
                      this.onCommentorChange(author)
>>>>>>> c9fce0d2f621a5a2727c549090e23a32e98ff8e2
                    }}

                />
            </div>
        );
    }
});

<<<<<<< HEAD
/** Interface to Store */
const commentsReducer = (state={
    sources:[],
    sourceWords:[],
    sourceWordComments:[],

    // items:[],

=======
const commentsReducer = (state={
    sources:[],
    //
    items:[],
>>>>>>> c9fce0d2f621a5a2727c549090e23a32e98ff8e2
    author:'',
    text: ''
}, action) => {
    switch (action.type) {
        case actions.ADD_SOURCE:
        return { ...state,
            sources: [...state.sources, {id: Math.random(), ...action.source}] };
<<<<<<< HEAD
        case actions.ADD_WORD:
        return { ...state,
            sourceWords: [...state.sourceWords, {id: Math.random(), ...action.word}] };

        case actions.ADD_COMMENT:
        return { ...state,
            sourceWordComments: [...state.sourceWordComments, {id: Math.random(), ...action.comment}] };
=======

//        case actions.ADD_SOURCE_WORD:
//        case actions.CHOOSE_SOURCE:

        case actions.ADD_COMMENT:
        return { ...state,
            items: [...state.items, {id: Math.random(), ...action.comment}] };
>>>>>>> c9fce0d2f621a5a2727c549090e23a32e98ff8e2

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
