const Item = ({id, title, description, date, time, deleteData, status}) => {
    
    function deleteItem() {
        status.current = true
        deleteData(function(prev) {
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
