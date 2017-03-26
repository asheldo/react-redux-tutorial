# My fork of uniqname's react-redux-tutorial

Code from react-redux tutorial

## General Notes
- Transpiles JSX via lib (babel-server.js?)
- so just serve public via:
- npm start

## Branch Notes

### 101 (uniqname's fork) - babel-server + redux
There are a few things that could be cleared up in the example.

### localplusredux - my fork + branches for offlinefirst

#### Apr '17 -- NLP? "natural"

#### Mar '17 -- pouchdb
Add (de-duplicate?) Sources first, then figure out domain

#### Feb '17 -- 4 kinds of SPA state...  
Adding plain vanilla setState to the Redux store stuff.

TODO: Finish thunk middleware
    /**
     * Why middleware?
     *  so postSource knows the id PK from addWordCmd (async someday)
     *  to pass to setState-y maybe-callbacks for SelectWord control state.
     */
    function postSource({ getState, dispatch })

#### Feb '17 -- JSX
stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option
