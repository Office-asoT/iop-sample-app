import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";
import Overlay from "ol/Overlay";
import { boundingExtent } from "ol/extent";

export class FarmFieldMapWidget {
  constructor(domNode, farmFieldList) {
    this.map = new Map({
      target: domNode,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View(),
    });

    // ピンの座標を変換
    const coordinates = farmFieldList.map((location) => fromLonLat(location.geocode));

    // 全体を表示するためのビュー範囲を設定
    const extent = boundingExtent(coordinates);
    this.map.getView().fit(extent, { padding: [50, 50, 50, 50] });

    // ピンの作成
    const features = farmFieldList.map((location) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(location.geocode)),
        name: location.name,
        address: location.address,
        crop: location.crop,
        plantingDate: location.plantingDate,
        extensionOffice: location.extensionOffice,
        jaFuelSupplier: location.jaFuelSupplier
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            src: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // ピンのアイコン
            scale: 0.05,
          }),
        })
      );

      return feature;
    });

    // ベクターレイヤーの作成
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: features,
      }),
    });

    this.map.addLayer(vectorLayer);

    // カーソルをハンドに変更
    this.map.on("pointermove", (event) => {
      const hit = this.map.hasFeatureAtPixel(event.pixel);
      this.map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });

  }

}