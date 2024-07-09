import styles from "./itemGrid.module.scss";

import Item from "./item";

const ItemGrid = ({ items, type }) => {

  return (
    <ul className={styles.grid}>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <Item {...item} type={type}></Item>
          </li>
        );
      })}
    </ul>
  );
};

export default ItemGrid;
