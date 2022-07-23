import Item from './Item'

const List = ({status, data, deleteData}) => {
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
                        deleteData={deleteData}
                        status={status}
                    />
                )
            })
        }</div>
    );
}

export default List;
