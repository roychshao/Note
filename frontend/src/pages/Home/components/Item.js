
const Item = ({id, title, description, date, time, setData, renderStatus, setObj}) => {

    function deleteItem() {
        renderStatus.current = 2;
        setObj({"id":id});
        setData(function(prev) {
            return prev.filter(item => item.id !== id)
        })
    }

    return (
        <div className="item-box">
            <div className="texts">
                <p className="item-first-line">[{title}]</p>
                <p className="item-second-line">{description}</p>
                <p className="item-third-line">{`${date} ${time}`}</p>
            </div>
            <button className="item-delete" onClick={deleteItem}>刪除</button>
        </div>
    )
}

export default Item;
