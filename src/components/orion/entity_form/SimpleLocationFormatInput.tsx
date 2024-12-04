import { Grid, Input, Badge } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import { EntityFormData } from "./EntityForm";
import leaflet, { latLng, LatLng, Layer, Marker } from "leaflet";
import "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

leaflet.Icon.Default.imagePath = "/";

type Props = {
  field: FieldArrayWithId<EntityFormData, "data", "id">;
  control: Control<EntityFormData, any>;
  index: number;
  isAttrFixed?: boolean;
};

type GeoManProps = {
  type: "geo:point" | "geo:line" | "geo:polygon" | "geo:box";
  onChange: (value: LatLng | LatLng[]) => void;
  value?: string;
};

const GeoMan: FC<GeoManProps> = ({ type, onChange, value }) => {
  const [layer, setLayer] = useState<Layer>();

  const map = useMap();
  map.pm.addControls({
    position: "topleft",
    drawMarker: type === "geo:point",
    drawPolygon: type === "geo:polygon",
    drawPolyline: type === "geo:line",
    drawRectangle: type === "geo:box",
    drawCircleMarker: false,
    drawCircle: false,
    drawText: false,
    dragMode: false,
    removalMode: false,
    cutPolygon: false,
  });

  useEffect(() => {
    map.on("pm:drawstart", () => {
      if (layer) {
        switch (type) {
          case "geo:point":
            map.pm.disableDraw("Marker");
            break;
          case "geo:line":
            map.pm.disableDraw("Line");
            break;
          case "geo:polygon":
            map.pm.disableDraw("Polygon");
            break;
          case "geo:box":
            map.pm.disableDraw("Rectangle");
            break;
          default:
            break;
        }
      }
    });

    map.on("pm:create", (e: any) => {
      switch (type) {
        case "geo:point":
          map.pm.disableDraw("Marker");
          break;
        case "geo:line":
          map.pm.disableDraw("Line");
          break;
        case "geo:polygon":
          map.pm.disableDraw("Polygon");
          break;
        case "geo:box":
          map.pm.disableDraw("Rectangle");
          break;
        default:
          break;
      }
      const val = e.layer._latlng
        ? `${e.layer._latlng.lat},${e.layer._latlng.lng}`
        : e.layer._latlngs.map((l: LatLng) => `${l.lat},${l.lng}`);
      onChange(val);
      setLayer(e.layer);
    });

    layer?.on("pm:update", (e: any) => {
      const val = e.layer._latlng
        ? `${e.layer._latlng.lat},${e.layer._latlng.lng}`
        : e.layer._latlngs.map((l: LatLng) => `${l.lat},${l.lng}`);
      onChange(val);
    });

    return () => {
      map.off("pm:drawstart");
      map.off("pm:create");
      map.off("pm:update");
    };
  }, [layer]);

  useEffect(() => {
    if (value && !layer) {
      if (Array.isArray(value)) {
        const latlngs = value.map((v) => {
          return latLng(
            v.split(",").map((v: any) => parseFloat(v)) as any as LatLng
          );
        });
        const layer = new leaflet.Polygon(latlngs);
        map.addLayer(layer);
        setLayer(layer);
      } else {
        const latlng = latLng(
          value.split(",").map((v) => parseFloat(v)) as any as LatLng
        );
        const layer = new Marker(latlng);
        map.addLayer(layer);
        setLayer(layer);
      }
    }
  }, [value, layer]);

  return <></>;
};

const SimpleLocationFormatInput: FC<Props> = ({ field, control, index, isAttrFixed }) => {
  return (
    <Grid gridTemplateColumns={{
      base: "1fr",
      md: "1fr 1fr"
    }} columnGap={3} key={field.id}>
      <Controller
        control={control}
        name={`data.${index}.key` as const}
        rules={{ required: "必須" }}
        render={({ field: controllerField }) => (
          !isAttrFixed ? (
            <Input
              value={controllerField.value}
              onChange={controllerField.onChange}
              backgroundColor="white"
              placeholder="属性名"
            />
          ) : (
            <Badge marginBottom="3px">{controllerField.value}</Badge>
          )
        )}
      />
      <Controller
        control={control}
        name={`data.${index}.value` as const}
        render={({ field: controllerField }) => (
          <MapContainer
            style={{ height: "300px" }}
            center={[35.509831, 134.821322]}
            zoom={11}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoMan
              type={field.type as any}
              onChange={controllerField.onChange}
              value={controllerField.value}
            />
          </MapContainer>
        )}
      />
    </Grid>
  );
};

export default SimpleLocationFormatInput;
