import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "./features/ui/Layout";
import { DogsContextProvider } from "./features/dogs/DogsContext";

import { Home, BreedDogs, FavoriteDogs } from "./pages";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DogsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/breed/:breadName" element={<BreedDogs />} />
              <Route path="/favorite-images" element={<FavoriteDogs />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DogsContextProvider>
    </QueryClientProvider>
  );
}

export default App;
