
import { render, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { App } from "src/App";
import { tasksSelector, resetStore } from "src/store/taskSlice";
import { store } from 'src/store/configureStore';



const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
});

afterEach(() => {
    store.dispatch(resetStore());
});

describe('Список задач', () => {
    // не содержит выполненные задачи
    // после нажатия на кнопку фильтрации
    it('с включенным фильтром', async () => {
        render(<App />);
        const filter = screen.getByTestId('filter-checkbox');
        const inputEl = screen.getByRole('textbox');
        const addBtnEl = screen.getByAltText(/Добавить/i);

        // Добавление 2 задач
        await userEvent.clear(inputEl);
        await userEvent.type(inputEl, 'Выполненная задача!');
        await userEvent.click(addBtnEl);
        const task = screen.getByText('Выполненная задача!');
        await userEvent.click(task);

        await userEvent.type(inputEl, 'Невыполненная');
        await userEvent.click(addBtnEl);

        // Включение фильтра
        await userEvent.click(filter);

        const tasks = screen.queryAllByText('Выполненная задача!', { exact: true });
        expect(tasks).toHaveLength(0);
    });

    // показывает как выполненные, так и не выполненные задачи
    // после повторного нажатия на кнопку фильтрации
    it('с выключенным фильтром', async () => {
        render(<App />);
        const filter = screen.getByTestId('filter-checkbox');
        const inputEl = screen.getByRole('textbox');
        const addBtnEl = screen.getByAltText(/Добавить/i);

        // Добавление 2 задач
        await userEvent.clear(inputEl);
        await userEvent.type(inputEl, 'Выполненная задача!');
        await userEvent.click(addBtnEl);
        const task = screen.getByText('Выполненная задача!');
        await userEvent.click(task);

        await userEvent.type(inputEl, 'Невыполненная задача!');
        await userEvent.click(addBtnEl);

        // Включение фильтра
        await userEvent.click(filter);

        // Выключение фильтра
        await userEvent.click(filter);

        const items = tasksSelector(store.getState());

        const tasks = screen.queryAllByText('Выполненная задача!', { exact: true });
        expect(tasks).toHaveLength(1);

        const doneTasks = screen.queryAllByText('Невыполненная задача!', { exact: true });
        expect(doneTasks).toHaveLength(1);
    });

    // содержит невыполненные задачи
    // после нажатия на кнопку фильтрации
    it('с включенным фильтром', async () => {
        render(<App />);
        const filter = screen.getByTestId('filter-checkbox');
        const inputEl = screen.getByRole('textbox');
        const addBtnEl = screen.getByAltText(/Добавить/i);

        // Добавление 2 задач
        await userEvent.clear(inputEl);
        await userEvent.type(inputEl, 'Выполненная задача!');
        await userEvent.click(addBtnEl);
        const task = screen.getByText('Выполненная задача!');
        await userEvent.click(task);

        await userEvent.type(inputEl, 'Невыполненная задача!');
        await userEvent.click(addBtnEl);

        // Включение фильтра
        await userEvent.click(filter);

        const doneTasks = screen.queryAllByText('Невыполненная задача!', { exact: true });
        expect(doneTasks).toHaveLength(1);
    });
});
