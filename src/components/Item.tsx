import { DeleteButton } from "./DeleteButton";

type Props = Task & {
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
};

export const Item = (props: Props) => {
  if (!props.header) return null;
  const header = props.header.substring(0, 32);
  return (
    <li className="item-wrapper">
      <input
        type="checkbox"
        id={props.id}
        defaultChecked={props.done}
        onChange={() => props.onToggle(props.id)}
      />
      <label htmlFor={props.id}>
        {props.done ? <s>{header}</s> : header}
      </label>
      <DeleteButton
        disabled={!props.done}
        onClick={() => props.onDelete(props.id)}
      />
    </li>
  );
};
