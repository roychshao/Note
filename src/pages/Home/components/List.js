import Item from './Item'

const List = ({status, data, deleteData}) => {
    return (
        <div>{
            data.map((item) => {
                const {id, title, description, date, time} = item;
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
