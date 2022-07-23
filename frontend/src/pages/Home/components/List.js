import Item from './Item'

const List = ({data, setData, renderStatus, setObj}) => {
    return (
        <div>{
            data.map((it) => {
                const {id, title, description, date, time} = it;
                return (
                    <Item
                        key={id}
                        id={id}
                        title={title}
                        description={description}
                        date={date}
                        time={time}
                        setData={setData}
                        renderStatus={renderStatus}
                        setObj={setObj}
                    />
                )
            })
        }</div>
    );
}

export default List;
