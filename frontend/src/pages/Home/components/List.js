import Item from './Item'

const List = ({data, setData, renderStatus, setObj, setGetItem}) => {
    return (
        <div>{
            data.map((it) => {
                const {id, title, description, date, time, done, collected} = it;
                return (
                    <Item
                        key={id}
                        id={id}
                        title={title}
                        description={description}
                        date={date}
                        time={time}
                        done={done}
                        collected={collected}
                        setData={setData}
                        renderStatus={renderStatus}
                        setObj={setObj}
                        setGetItem={setGetItem}
                    />
                )
            })
        }</div>
    );
}

export default List;
