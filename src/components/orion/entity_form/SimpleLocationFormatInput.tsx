import { Box, Grid, Input } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import { EntityFormData } from "./EntityForm";
import leaflet, { LatLng, Layer, Marker } from "leaflet";
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
};

type GeoManProps = {
  type: "geo:point" | "geo:line" | "geo:polygon" | "geo:box";
  onChange: (value: LatLng | LatLng[]) => void;
};

const GeoMan: FC<GeoManProps> = ({ type, onChange }) => {
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
      onChange(e.marker._latlngs || e.layer._latlng);
      setLayer(e.layer);
    });

    layer?.on("pm:update", (e: any) => {
      onChange(e.layer._latlngs || e.layer._latlng);
    });

    return () => {
      map.off("pm:drawstart");
      map.off("pm:create");
      map.off("pm:update");
    };
  }, [layer]);

  return <></>;
};

const SimpleLocationFormatInput: FC<Props> = ({ field, control, index }) => {
  return (
    <Grid gridTemplateColumns="1fr 1fr" columnGap={3} key={field.id}>
      <Controller
        control={control}
        name={`data.${index}.key` as const}
        rules={{ required: "必須" }}
        render={({ field: controllerField }) => (
          <Input
            value={controllerField.value}
            onChange={controllerField.onChange}
            backgroundColor="white"
            placeholder="属性名"
          />
        )}
      />
      <Controller
        control={control}
        name={`data.${index}.value` as const}
        render={({ field: controllerField }) => (
          <MapContainer
            style={{ height: "300px" }}
            center={[51.505, -0.09]}
            zoom={13}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoMan
              type={field.type as any}
              onChange={controllerField.onChange}
            />
          </MapContainer>
        )}
      />
    </Grid>
  );
};

export default SimpleLocationFormatInput;
