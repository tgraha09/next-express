import { useState } from "react";

function CommentsPage(){

    const [comments, setComments] = useState([])

    const fetchComments = async () =>{
        const response = await fetch('/api/comments')
        const data = await response.json()
        setComments(data)
    }
    
    return (
        <>
            <button onClick={fetchComments}>Load Comments</button>
            {
                comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            {comment.id} {comment.text}
                        </div>
                    )
                })
            }
            <Poetry></Poetry>
        </>
    )
}

function Poetry(){

    const [quotes, SetQuotes] = useState([])

    const fetchQuotes = async () =>{
        const response = await fetch('https://poetrydb.org/title/Ozymandias/lines.json')
        const data = await response.json()
        
       /* console.log(data[0].lines);
        data[0].lines.map(quote => {
            console.log(quote);
        })*/
        console.log(data[0]);
        SetQuotes(data[0].lines)
    }
    return (
        <>
            <button onClick={fetchQuotes}>Load Quotes</button>
            {
                
               quotes.map((quote, i) => {
                    
                    return (
                        <div key={i}>
                            {quote}
                        </div>
                    )
                })
            }
        </>
    )
}



export default CommentsPage