import React, {
    ReactElement,
    useCallback,
    useDeferredValue,
    useEffect,
    useState,
} from "react";
import SearchInput from "~/Components/molecules/search-input";


interface ListTabProps<T> {
    items: T[];
    filter: (items: T[], search: string) => T[];
    cards: (
        items: T[]
    ) => JSX.Element | JSX.Element[] | React.ReactNode | ReactElement[] | null;
    Modal: () => JSX.Element;
}

const ListTab = <T,>({ cards, items, Modal, filter }: ListTabProps<T>) => {
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState<T[]>([] as T[]);
    const deferredItems = useDeferredValue(filteredItems);

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const search = e.target.value.toLowerCase();
            setSearch(search);
            setFilteredItems((state) => filter(state, search));
        },
        [filter]
    );

    return (
        <React.Fragment>
            <div className="flex justify-between items-center mb-2">
                <div
                    className="team-list w-1/2 list-view-filter col-span-8"
                    style={{ marginTop: 12 }}
                >
                    <SearchInput
                        value={search}
                        onChange={handleSearch}
                        placeholder="Busque a Consulta..."
                        className="rounded-md"
                    />
                </div>

            </div>
            {cards(deferredItems)}
        </React.Fragment>
    );
};

export default ListTab;
