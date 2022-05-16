import { BrowserRouter } from "react-router-dom";
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import useFetchDogBreeds from "../features/dogs/useFetchDogBreeds";
import Home from './Home';
import { mockBreeds } from './__mocks__/breeds.mock';
const mockUseFetchDogBreeds = useFetchDogBreeds as jest.Mock;

jest.mock('../features/dogs/useFetchDogBreeds');

describe('<Home /> Component', () => {
    beforeEach(() => {
        mockUseFetchDogBreeds.mockReturnValue({
            dogBreeds: mockBreeds
        })
    })
    it('When type the name of the breed in the search box, suggesions should get only with breeds with start words of entered string', () => {
        const h = render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        const input = h.container.querySelector('#dogs-breeds-autocomplete');
        expect(input).toBeInTheDocument();
        if(input) {
            userEvent.type(input, 'p')
        }
        expect(h.queryByTestId('breed-item-affenpinscher')).not.toBeInTheDocument();
        expect(h.queryByTestId('breed-item-african')).not.toBeInTheDocument();
        expect(h.queryByTestId('breed-item-airedale')).not.toBeInTheDocument();
        expect(h.queryByTestId('breed-item-akita')).not.toBeInTheDocument();
        expect(h.queryByTestId('breed-item-pointer')).toBeInTheDocument();
        expect(h.queryByTestId('breed-item-pomeranian')).toBeInTheDocument();
        expect(h.queryByTestId('breed-item-poodle')).toBeInTheDocument();
        expect(h.queryByTestId('breed-item-pug')).toBeInTheDocument();
        expect(h.queryByTestId('breed-item-redbone')).not.toBeInTheDocument();
        // expect(h).toMatchSnapshot();
    })
});