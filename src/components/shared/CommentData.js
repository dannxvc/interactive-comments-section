
import {default as PersonOne} from '../../assets/img/avatars/image-juliusomo.png';
import {default as PersonTwo} from '../../assets/img/avatars/image-amyrobson.png';
import {default as PersonThree} from '../../assets/img/avatars/image-maxblagun.png';
import {default as PersonFour} from '../../assets/img/avatars/image-ramsesmiron.png';

const currentAvatar = {
  1:{
    "avatar":PersonOne,
    "username": "juliusomo"
  },
  2:{
    "avatar":PersonTwo,
    "username": "amyrobson"
  },
  3:{
    "avatar":PersonThree,
    "username": "maxblagun"
  },
  4:{
    "avatar":PersonFour,
    "username": "ramsesmiron"
  }
}

export const commentData = {
    "currentUser": {
      "image": currentAvatar[1].avatar,
      "username": currentAvatar[1].username,
    },
    "comments": [
      {
        "id": 1,
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        "createdAt": "1 month ago",
        "score": 12,
        "user": {
          "image": PersonTwo,
          "username": "amyrobson"
        },
        "replies": [
          {
            "id": 7,
            "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            "createdAt": "1 week ago",
            "score": 4,
            "replyingTo": "amyrobson",
            "user": {
              "image": PersonFour,
              "username": "ramsesmiron"
            },
            "replies": [],
          },
        ]
      },
      {
        "id": 2,
        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "createdAt": "2 weeks ago",
        "score": 5,
        "user": {
          "image": PersonThree,
          "username": "maxblagun"
        },
        "replies": [
          {
            "id": 3,
            "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            "createdAt": "1 week ago",
            "score": 4,
            "replyingTo": "maxblagun",
            "user": {
              "image": PersonFour,
              "username": "ramsesmiron"
            },
            "replies": [],
          },
          {
            "id": 4,
            "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            "createdAt": "2 days ago",
            "score": 2,
            "replyingTo": "ramsesmiron",
            "user": {
              "image": PersonOne,
              "username": "juliusomo"
            },
            "replies": [],
          }
        ]
      },
      
    ]
};
