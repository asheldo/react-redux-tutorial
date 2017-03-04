'use strict'

/**
 * TODO - import into pouch/couch
 */
const empiricalData = () => ({
  // indexes: id OR title
  wordSources:  [
      {id: 1, title: "Chronicle, Peterborough", lang: "OE", description: "Last chronicle (early 12th-c.)",
       pages:[{page:1, lines:[{line:1, oe:"hwaet", en:"so"}]}]},
      {id: 2, title: "Beowulf (2001)", lang: "OE", description: "Let me put it this way. You've heard of Socrates? Aristotle? Plato? Morons!",
       pages:[{page:1, lines:[{line:1, oe:"hwaet", en:"so"}]}]},
      {id: 3, title: "Matt Poulson's diary", lang: "OE", description: "It's just a function!",
       pages:[{page:1, lines:[{line:1, oe:"hwaet", en:"so"}]}]},
      {id: 4, title: "Bruce Campbell' poetry", lang: "OE", description: "Fish in a tree? How can that be?",
       pages:[{page:1, lines:[{line:1, oe:"hwaet", en:"so"}]}]},
      {id: 5, title: "Tim Riker's hymn", lang: "OE", description: "So what we're learning is to keep our componets dumb?",
       pages:[{page:1, lines:[{line:1, oe:"hwaet", en:"so"}]}]}
  ],
  sourceWords: [
    {id: 1, sourceId:2, lang: "OE", word:"hwaet", en:"so"},
    {id: 2, sourceId:2, lang: "OE", word:"we", en:"the"},
    {id: 3, sourceId:2, lang: "OE", word:"gardena", en:"spear-danes"},
    {id: 4, sourceId:2, lang: "OE", word:"geardagum", en:"bygone-years"},
    {id: 5, sourceId:1, lang: "OE", word:"thing", en:"legislative issue"},
    {id: 6, sourceId:1, lang: "OE", word:"leg", en:"law"}
  ],
  sourceWordComments:  [
      {id: 1, wordId: 1, author: "Cory Brown", text: "My 2 scents"},
      {id: 2, wordId: 1, author: "Jared Anderson", text: "Let me put it this way. You've heard of Socrates? Aristotle? Plato? Morons!"},
      {id: 3, wordId: 2, author: "Matt Poulson", text: "It's just a function!"},
      {id: 4, wordId: 2, author: "Bruce Campbell", text: "Fish in a tree? How can that be?"},
      {id: 5, wordId: 1, author: "Tim Riker", text: "So what we're learning is to keep our componets dumb?"},
      {id: 6, wordId: 3, author: "JRR Tolkein", text: `The gar / spear... we know what (childish?
        fantasy-tastic?) congitions it connects in our modern (boy? girl? man? woman?) mind.
        But what of pre-firearm, 10th-century (as opposed to 5th-century) Anglo-Saxon person's conceptions?
        How do representations, conceptions and reasoning around words change over time,
        as real things, or real+ideal things, become just ideas?`},
      {id: 7, wordId: 3, author: "JRR Tolkein", text: "So what we are learning is to keep our componets dumb?"}
  ],
  //
  comments:  [
      {id: 1, author: "Cory Brown", text: "My 2 scents"},
      {id: 2, author: "Jared Anderson", text: "Let me put it this way. You've heard of Socrates? Aristotle? Plato? Morons!"},
      {id: 3, author: "Matt Poulson", text: "It's just a function!"},
      {id: 4, author: "Bruce Campbell", text: "Fish in a tree? How can that be?"},
      {id: 5, author: "Tim Riker", text: "So what we're learning is to keep our componets dumb?"}
  ],
})
