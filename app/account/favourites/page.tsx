import FavPropertiesTable from "./fav-properties-table";

const FavouritesPage = async ({
  searchParams,
}: {
  searchParams?: Promise<any>;
}) => {
  const searchParamValue = await searchParams;

  return (
    <div className="w-[900px]">
      <h1 className="text-4xl font-bold mt-6">My Favourites</h1>

      <FavPropertiesTable
        page={searchParamValue.page ? parseInt(searchParamValue.page) : 1}
      />
    </div>
  );
};

export default FavouritesPage;
