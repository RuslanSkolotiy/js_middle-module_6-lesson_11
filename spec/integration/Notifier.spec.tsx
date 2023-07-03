import { render, screen } from "@testing-library/react";
import { App } from "src/App";
import ue from "@testing-library/user-event";
import { store } from "src/store/configureStore";
import { resetStore } from "src/store/taskSlice";

const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
});

afterEach(() => {
    store.dispatch(resetStore());
});

describe('Оповещение при вополнении задачи', () => {
    it('появляется и содержит заголовок задачи', async () => {
        render(<App />);

        const inputEl = screen.getByRole('textbox');
        const addBtnEl = screen.getByAltText(/Добавить/i);

        // Добавление 2 задач
        await userEvent.clear(inputEl);
        await userEvent.type(inputEl, 'Новая задача 1!');
        await userEvent.click(addBtnEl);
        const task1 = screen.getByText('Новая задача 1!');
        await userEvent.click(task1);

        const notificaton = screen.getByTestId('notifier');
        expect(notificaton).toBeInTheDocument();
        const wrapper = notificaton.querySelector('div.notifier-wrapper');
        expect(wrapper).not.toBeNull();
        if(wrapper) {
            expect(wrapper.innerHTML.includes('Новая задача 1!')).toBe(true);
        }
        
    });

    it('одновременно может отображаться только одно', async () => {
        render(<App />);

        const inputEl = screen.getByRole('textbox');
        const addBtnEl = screen.getByAltText(/Добавить/i);

        // Добавление 2 задач
        await userEvent.clear(inputEl);
        await userEvent.type(inputEl, 'Новая задача 1!');
        await userEvent.click(addBtnEl);
        const task1 = screen.getByText('Новая задача 1!');
        await userEvent.click(task1);

        await userEvent.type(inputEl, 'Новая задача 2!');
        await userEvent.click(addBtnEl);
        const task2 = screen.getByText('Новая задача 2!');
        await userEvent.click(task2);

        const notificatons = screen.getAllByTestId('notifier');
        expect(notificatons).toHaveLength(1);
    });
});