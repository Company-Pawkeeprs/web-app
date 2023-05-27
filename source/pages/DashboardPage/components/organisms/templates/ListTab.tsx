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
            <div
                className="
                flex 
                flex-wrap
                mobile:gap-3
                align-center 
                justify-between
                "
            >
                <div
                    className="
                    mt-3 
                    w-1/2
                    mobile:w-full
                    "
                >
                    <SearchInput
                        value={search}
                        onChange={handleSearch}
                        className="form-control mobile:!w-full"
                        placeholder="Busque a Consulta..."
                    />
                </div>
                <div
                    className="
                    mobile:flex content-start
                    "
                >
                    <Modal />
                </div>
            </div>
            <div className="team-list list-view-filter">
                {cards(deferredItems)}
            </div>
        </React.Fragment>
    );
};

export default ListTab;
