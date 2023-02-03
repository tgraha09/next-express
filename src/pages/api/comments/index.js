import {comments} from '../../../../data/comments'


export default async function handler(req, res){
    console.log("Handler");
    console.log(comments);
    res.status(200).json(comments)
}