const TEST_DATA = {
  "z.,mxcnvbkjznfasd": {
    closeComments: false,
    content:
      "i am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cooli am cool because im cool",
    author: "12345",
    rating: 0,
    theme: "i am cool",
    createdAt: new Date(),
    comments: [
      {
        id: "09876543",
        replyReference: "",
        rating: 0,
        author: "p90w3tu8wesur9t",
        createdAt: new Date(),
        content: "hi,you are really great",
      },
    ],
  },
  "sp;oiejhgopisdf": {
    closeComments: false,
    content: "i am cool because im cool",
    author: "12345",
    rating: 0,
    theme: "i am cool",
    createdAt: new Date(),
    comments: [
      {
        id: "09876543",
        replyReference: "",
        rating: 0,
        author: "p90w3tu8wesur9t",
        createdAt: new Date(),
        content: "hi,you are really great",
      },
      {
        id: "09876543",
        replyReference: "",
        rating: 0,
        author: "p90w3tu8wesur9t",
        createdAt: new Date(),
        content: "and COOL",
      },
    ],
  },
  "asodifgjbspodfi;so": {
    closeComments: false,
    content: "i am cool because im cool",
    author: "243567",
    rating: 0,
    theme: "i am cool",
    createdAt: new Date(),
    comments: [
      {
        id: "09876543",
        replyReference: "",
        rating: 0,
        author: "p90w3tu8wesur9t",
        createdAt: new Date(),
        content: "hi,you are really great",
      },
    ],
  },
  "zxcv;lzdifh;.lksdf": {
    closeComments: false,
    content: "i am cool because im cool",
    author: "243567",
    rating: 0,
    theme: "i am cool",
    createdAt: new Date(),
    comments: [
      {
        id: "09876543",
        replyReference: "",
        rating: 0,
        author: "p90w3tu8wesur9t",
        createdAt: new Date(),
        content: "hi,you are really great",
      },
    ],
  },
};

export const getPost = (postId) => TEST_DATA[postId];

export default TEST_DATA;
