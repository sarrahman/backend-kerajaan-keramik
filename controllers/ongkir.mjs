import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const constShipingEstimation = async (req, res) => {
  let {cabang, tujuan, qty} = req.body;
  let detailTujuan = null;

  const optiogoogleMapsGeocodingnsOpt = {
    method: "GET",
    url: "https://google-maps-geocoding.p.rapidapi.com/geocode/json",
    params: { address: `${tujuan}`, language: "id" },
    headers: {
      "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
      "x-rapidapi-key": `${process.env.APIKEY}`,
    },
  };

  await axios
    .request(optiogoogleMapsGeocodingnsOpt)
    .then(function (response) {
      detailTujuan = [
        response.data.results[0].address_components[0].long_name,
        response.data.results[0].address_components[1].long_name,
        response.data.results[0].address_components[2].long_name,
      ];
      tujuan = [
        response.data.results[0].geometry.location.lat,
        response.data.results[0].geometry.location.lng,
      ];
    })
    .catch(function (error) {
      return res.status(500).json({
        message: error.message,
      });
    });

  const truewayMatrixOpt = {
    method: "GET",
    url: "https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix",
    params: {
      origins: `${cabang}`,
      destinations: `${tujuan}`,
    },
    headers: {
      "x-rapidapi-host": "trueway-matrix.p.rapidapi.com",
      "x-rapidapi-key": `${process.env.APIKEY}`,
    },
  };

  axios
    .request(truewayMatrixOpt)
    .then(function (response) {
      let jarak = response.data.distances[0][0];
      jarak = jarak / 1000;
      const cost = logicCostEstimate(jarak, qty);
      return res.status(200).json({
        detailTujuan,
        jarak: jarak.toFixed(2),
        cost: Math.ceil(cost),
      });
    })
    .catch(function (error) {
      return res.status(500).json({
        message: error.message,
      });
    });
};

const logicCostEstimate = (jarak, qty) => {
  let cost = 0;

  if (jarak > 3) {
    cost = jarak * 5000;
  }

  if (qty < 100 && qty >= 50) {
    cost = cost - cost * 0.05;
  } else if (qty >= 100) {
    cost = cost - cost * 0.1;
  }

  return cost;
};
