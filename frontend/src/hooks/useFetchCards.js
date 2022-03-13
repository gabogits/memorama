import { useState } from "react";

export const useFetchCards = (url, NUMBER_CARDS) => {
  const [arrayImages, setArrayImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlefetchCards = async (query) => {
    setLoading(true);
    await fetch(
      `${url}${query}&orientation=landscape&client_id=2CIGTbb0j0WvgJ_TI2k0fGeJ-YjtmTAthvAwgX4ytZE&per_page=${NUMBER_CARDS}&order_by=popular`
    )
      .then((resp) => resp.json())
      .then(({ results }) => {
        const arrayImages = results.map((item) => {
          return {
            parid: item.id,
            url: item.urls.small,
          };
        });

        if (arrayImages.length === NUMBER_CARDS) {
          setArrayImages(arrayImages);
          setError("");
        } else {
          setArrayImages([]);
          setError("No se encontraton resultados, intenta con otro tema");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Ocurrio un error");
        setLoading(false);
      });
  };

  return {
    arrayImages,
    loading,
    error,
    setArrayImages,
    handlefetchCards,
  };
};
