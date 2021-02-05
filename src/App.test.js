import App from './App';
import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('menu items are rendered', async()=>{
    render(<App/>);
    await waitFor(()=> screen.findByText(/orange/));

    expect(screen.getByText(/orange/)).toBeInTheDocument();
});
