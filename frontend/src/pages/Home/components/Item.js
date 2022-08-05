import doneIcon from '../public/doneIcon.png';
import notDone from '../public/notDone.png';
import heart from '../public/heart.png';
import whiteHeart from '../public/whiteHeart.png';

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
        setData(function(prev) {
            return prev.filter(item => item.id !== id)
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
            <img id="doneIcon" src={doneIcon} alt="doneIcon" onClick={()=>{doneItem()}} width="30px" style={{
                display: done ? "block" : "none" 
            }}/>
            <img id="notDone" src={notDone} alt="notDone" onClick={()=>{doneItem()}} width="30px" style={{
                display: done ? "none" : "block"
            }}/>
            <img id="heart" src={heart} alt="heart" onClick={()=>{collectItem()}} width="30px" style={{
                display: collected ? "block" : "none"
            }}/>
            <img id="whiteHeart" src={whiteHeart} alt="whiteHeart" onClick={()=>{collectItem()}} width="30px" style={{
                display: collected ? "none" : "block"
            }}/>
            <button id="item-delete" className="item-delete" onClick={deleteItem} style={{
                display: collected ? "none" : "block"
            }}>刪除</button>
        </div>
    )
}

export default Item;
