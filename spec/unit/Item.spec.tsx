import { render, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { Item } from "src/components/Item";

const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
});

describe('Элемент списка задач', () => {
    it('название не должно быть больше 32 символов', () => {
        const onDelete = jest.fn();
        const onToggle = jest.fn();
        const longHeader = 'Очень длинное название, больше 32 символов';
        render(<Item
            id="1"
            header={longHeader}
            done={false}
            onDelete={onDelete}
            onToggle={onToggle}
        />);
        const label = screen.getByText('Очень длинное', { exact: false });
        expect(label.innerHTML.length).toBe(32);
    });
    it('название не должно быть пустым', async () => {
        const onDelete = jest.fn();
        const onToggle = jest.fn();
        render(<Item
            id="1"
            header=""
            done={false}
            onDelete={onDelete}
            onToggle={onToggle}
        />);

        const listItem = screen.queryByRole('listitem');
        expect(listItem).toBeNull();
    });

    it('нельзя удалять невыполненные задачи', async () => {
        const onDelete = jest.fn();
        const onToggle = jest.fn();


        render(<Item
            id="1"
            header="Задание"
            done={false}
            onDelete={onDelete}
            onToggle={onToggle}
        />);

        const deleteBtn = screen.getByRole('button');
        await userEvent.click(deleteBtn);
        expect(onDelete).not.toBeCalled();
    });

    it('Можно удалять выполненные задачи', async () => {
        const onDelete = jest.fn();
        const onToggle = jest.fn();

        render(<Item
            id="1"
            header="Задание"
            done={true}
            onDelete={onDelete}
            onToggle={onToggle}
        />);

        const deleteBtn = screen.getByRole('button');
        await userEvent.click(deleteBtn);
        expect(onDelete).toBeCalled();
    });

    it('Можно помечать как выполненную', async () => {
        const onDelete = jest.fn();
        const onToggle = jest.fn();

        render(<Item
            id="1"
            header="Задание"
            done={false}
            onDelete={onDelete}
            onToggle={onToggle}
        />);

        const checkbox = screen.getByRole('checkbox');
        await userEvent.click(checkbox);
        expect(onToggle).toBeCalled();
        expect(onDelete).not.toBeCalled();
    });
});