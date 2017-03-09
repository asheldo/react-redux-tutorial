/** Imports */

const { createClass, PropTypes } = React;
const { createStore, applyMiddleware } = Redux;
const { Provider } = ReactRedux;

/** Model -- see data/hus.js */

/** Actions */
const actions = {
                  CHOOSE_SOURCE:  Symbol('CHOOSE_SOURCE'),
                  ADD_SOURCE:     Symbol('ADD_SOURCE'),
                  ADD_WORD:       Symbol('ADD_WORD'),
                  ADD_COMMENT:    Symbol('ADD_COMMENT'),
                  // AUTHOR_CHANGE:  Symbol('AUTHOR_CHANGE'),
                  AUTHOR_SELECT:  Symbol('AUTHOR_SELECT')
                };

const addSourceRequestCmd = (source) => ({ type: actions.ADD_SOURCE_REQUEST, source });
const addSourceSuccessCmd = (source) => ({ type: actions.ADD_SOURCE_SUCCESS, source });
const addWordCmd = (word) => ({ type: actions.ADD_WORD, word });
const addCommentCmd = (comment) => ({ type: actions.ADD_COMMENT, comment });

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

/** From sources, list */
const sourceOption = ({id, title, lang}) =>
  (<option key={ id } value={ id } >{ title }</option>)
const SourceSelect = (props, context) => (
    <div className="sources">Source:&nbsp;
      <select className="sources"
        value={ props.source ? props.source.id : null }
        onChange={ (e) => { props.onSourceChange(e.target.value) } } >
        { props.sources.map(sourceOption) }
        </select>
        &nbsp;<a href="#sources/">Add/Edit</a>
    </div>
  );

const SourceForm = (props) => (
    <form className="sourceForm"
          onSubmit={ (e) => {
            e.preventDefault();
            const title = e.target.querySelector("input[name='title']").value
            const description = e.target.querySelector("input[name='description']").value
            const lang = e.target.querySelector("input[name='lang']").value
            props.onSourceSubmit( {title, description, lang} );
          }} >
        <input type="text" name="title" defaultValue={ props.source && props.source.title }
          placeholder="New source title" />
        <input type="text" name="description" defaultValue={ props.source && props.source.description }
          placeholder="Source description" />
        <input type="hidden" name="lang" value="OE" />
        <button>Post</button>
    </form>
  )

const sourceWordOption = ({id, word, en}) =>
  (<option key={ id } value={ id } >{ word }</option>)
const sourceWordOptions = ({source, words}) =>
    (!words || !source) ? [] // sourceWordOption({id: 0, word:"xx", en:"xxx"}) ]
      : words.filter((word) => word.sourceId == source.id).map(sourceWordOption)
const SourceWordSelect = (props, context) => (
    <div className="sourceWords">Word:&nbsp;
      <select className="sourceWords"
        onChange={ (e) => { props.onWordChange(e.target.value) } } >
        { sourceWordOptions(props) }
        </select>
        &nbsp;<a href="#words/">Add/Edit</a>
    </div>
)

const SourceWordForm = (props) => (
    <form className="sourceWordForm"
          onSubmit={ (e) => {
            e.preventDefault();
            const word = e.target.querySelector("input[name='word']").value
            const en = e.target.querySelector("input[name='en']").value
            const sourceId = e.target.querySelector("input[name='sourceId']").value
            const lang = e.target.querySelector("input[name='lang']").value
            props.onWordSubmit( {word, en, sourceId, lang} );
          }} >
        <input type="text" name="word" defaultValue={ props.word.word }
          placeholder="OE word" />
        <input type="text" name="en" defaultValue={ props.word.en }
          placeholder="Translation" />
        <input type="hidden" name="sourceId" value={ props.word.sourceId } />
        <input type="hidden" name="lang" value="OE" />
        <button>Post</button>
    </form>
  )

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
    </div>)

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
  )
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

/** Main Components */
const WordCommentatorBox = createClass({
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
      const { sources, sourceWords } = this.context.store.getState()
      const source = sources[0]
      const word = sourceWords.filter((word) => word.sourceId == source.id)[0]
      return { word: word, source: source, commentor: "" }
    },
    // Control state
    onSourceSave: function(newSource) {
      window.location.replace(window.location.pathname + window.location.search
        + '#comments/' + newSource.id + '/')
      // const { sources } = this.context.store.getState()
      // this.setState({ source: sources.filter((s) => (s.id == newSource.id))[0] })
    },
    onSourceChange: function(newSource) {
      const { sources, sourceWords } = this.context.store.getState()
      const source = sources.filter((s) => (s.id == newSource))[0]
      const word = sourceWords.filter((word) => word.sourceId == source.id)[0]
      this.setState({ source: source, word: word })
    },
    onWordSave: function(newWord) {
      window.location.replace(
        window.location.pathname + window.location.search + '#comments/'
      )
      const { sourceWords } = this.context.store.getState()
      this.setState({ word: newWord })
    },
    onWordChange: function(newWord) {
      const { sourceWords } = this.context.store.getState()
      console.log("newWord: " + newWord)
      this.setState({ word: sourceWords.filter((w) => (w.id == newWord))[0] })
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
        const { source, word, commentor,
          newWord, newSource, newComment, author } = this.state; // Control state, local (type 3)

        switch (this.props.location[0])  {
          case 'words':
              return (
                <div className="wordsForm">
                <h1>Word-Hus Edit Word</h1>
                <SourceWordForm
                  word={ word ? word : {sourceId: source.id} }
                  onWordSubmit= { (newWord) => {
                    dispatch(addWordCmd(newWord))
                    this.onWordSave(newWord)
                  }}
                />
                </div>)
          case 'sources':
              return (
                <div className="sourceForm">
                <h1>Word-Hus Edit Source</h1>
                <SourceForm
                  source={ source }
                  onSourceSubmit= { (newSource) => {
                    dispatch(addSourceCmd(newSource))
                    this.onSourceSave(newSource)
                  }}
                />
              </div>)
          default: // return <div><h1>Not Found</h1></div>;
        // Main, default 'comments' page
            const newSourceId = this.props.location[1]
            const newSource = newSourceId
              ? sources.filter((s) => s.id == newSourceId) : source
            return (
              <div className="commentBox">
                <h1>Word-Hus</h1>
                <SourceSelect source={ newSource } sources={ sources }
                  onSourceChange={ this.onSourceChange } />
                <SourceWordSelect word={ word } source={ newSource } words={ sourceWords }
                  onWordChange={ this.onWordChange } />
                <CommentorSelect comments={ sourceWordComments } commentor={ commentor }
                  onCommentorChange={ this.onCommentorChange }/>
                <h2>Comments</h2>
                <CommentList comments={
                     (commentor=="") ? sourceWordComments
                      : sourceWordComments.filter((comment) => comment.author == commentor) } />
                <CommentForm
                    author={ author }
                    onCommentSubmit= { (newComment) => {
                      dispatch(addCommentCmd(newComment))
                      // TODO Make CommentList manage this...
                      this.onCommentorChange(newComment.author)
                    }} />
            </div>
          )
        }
    }
})

/** middleware */
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
//  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
//    dispatch(requestPosts(subreddit))
/**
 * Why middleware?
 * so postSource knows the id PK from addWordCmd (async someday)
 * to pass to setState-y maybe-callbacks for SelectWord control state.
*/
function postSource({ getState, dispatch }) {
  return (next) => (action) => {
    console.log('will dispatch', action)
    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)
    console.log('state after dispatch', getState())
    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)

    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

/** Interface to Store */
const commentsReducer = (state={
    sources:[],
    sourceLastStatus:200, // if 0 means pending request
    sourceWords:[],
    sourceWordComments:[]
    // items:[],    author:'',    text: ''
}, action) => {
    switch (action.type) {
        case actions.ADD_SOURCE_REQUEST:
        return { ...state, sourceLastStatus: 0};
        case actions.ADD_SOURCE_SUCCESS:
        return { ...state,
          sourceLastStatus: 201,
            sources: [...state.sources, {id: Math.random(), ...action.source}] };

        case actions.ADD_WORD:
        return { ...state,
            sourceWords: [...state.sourceWords, {id: Math.random(), ...action.word}] };
        case actions.ADD_COMMENT:
        return { ...state,
            sourceWordComments: [...state.sourceWordComments, {id: Math.random(), ...action.comment}] };
        // case actions.AUTHOR_CHANGE: return { ...state, author: action.author };
        default:
        return state;
    }
};

// Split location into `/` separated parts, then render `Application` with it
function handleNewHash() {
  var location = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
  // React-Redux application
  ReactDOM.render(
      <Provider store={ store }>
          <WordCommentatorBox location={ location } />
      </Provider>, // document.getElementById('content')
        document.querySelector('#content'))
}

// Redux store
const store = createStore(commentsReducer);
stubData(store)
// Handle the initial route and browser navigation events
handleNewHash()
window.addEventListener('hashchange', handleNewHash, false);
