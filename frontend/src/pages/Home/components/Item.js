import { API_HOST } from '../../../global/constants'

const Item = ({id, title, description, date, time, deleteData, status}) => {

    function deleteItem() {
        status.current = true
        deleteData( async function(prev) {
            const obj = {
                "id": id
            }
            await fetch(`${API_HOST}/item/delete`, {
                method: "POST",
                headers: new Headers({
                    "Content-type": "application/json"
                }),
                body: JSON.stringify(obj)
            })
                .then(response => {})
                .catch(err => {
                    console.log(err);
                })
            return prev.filter(item => item.id !== id)
        })
    }


    return (
        <div className="item-box">
            <div className="texts">
                <p className="item-first-line">{title}</p>
                <p className="item-second-line">{`${date} ${time}`}</p>
                <p className="item-third-line">{description}</p>
            </div>
            <button className="item-delete" onClick={deleteItem}>刪除</button>
        </div>
    )
}

export default Item;
