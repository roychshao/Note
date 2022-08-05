
const Item = ({id, title, description, date, time, done, collected, setData, renderStatus, setObj, setGetItem}) => {

    function deleteItem() {
        renderStatus.current = 2;
        setObj({"id":id});
        setData(function(prev) {
            return prev.filter(item => item.id !== id)
        })
    }

    function doneItem() {
        renderStatus.current = 3;
        setObj({"id":id,"done":(done) ? false : true,"collected":collected});
        setGetItem(function(prev) {
            return prev * -1;
        })
    }

    function collectItem() {
        renderStatus.current = 3;
        setObj({"id":id,"done":done,"collected":(collected) ? false : true});
        setGetItem(function(prev) {
            return prev * -1;
        })
    }

    return (
        <div className="item-box">
            <div className="texts">
                <p className="item-first-line">[{title}]</p>
                <p className="item-second-line">{description}</p>
                <p className="item-third-line">{`${date} ${time}`}</p>
            </div>
            <button className="item-done" onClick={doneItem} style={{
                backgroundColor: done ? "#00DB00" : "#8E8E8E"
            }}>完成</button>
            <button className="item-collected" onClick={collectItem}>珍藏</button>
            <button className="item-delete" onClick={deleteItem}>刪除</button>
        </div>
    )
}

export default Item;
