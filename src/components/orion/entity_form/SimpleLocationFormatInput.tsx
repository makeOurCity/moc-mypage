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
      const val = e.layer._latlng
        ? `${e.layer._latlng.lat},${e.layer._latlng.lng}`
        : e.layer._latlngs.map((l: LatLng) => `${l.lat},${l.lng}`);
      onChange(val);
      setLayer(e.layer);
    });

    layer?.on("pm:update", (e: any) => {
      onChange(e.layer._latlngs || e.layer._latlng);
    });

    try {
      map.pm.Toolbar.createCustomControl({
        name: "currentLocation",
        block: "custom",
        title: "現在地",
        className: "leaflet-pm-icon-location",
        onClick: () => {
          if (!navigator.geolocation) {
            alert("現在地を取得できません");
            return;
          }
          navigator.geolocation.getCurrentPosition((pos) => {
            map.panTo([pos.coords.latitude, pos.coords.longitude]);
            map.zoomIn(14);
          });
        },
      });
    } catch (error) {}

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
    <>
      <style>
        {`
        .leaflet-pm-icon-location {
          background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTIyLjg4IDEyMi44OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIyLjg4IDEyMi44OCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PHBhdGggZD0iTTY4LjIzLDEzLjQ5YzEwLjQ0LDEuNDksMTkuNzksNi4zNiwyNi45MSwxMy40OGM3LjI5LDcuMjksMTIuMjMsMTYuOTMsMTMuNTgsMjcuNjhoMTQuMTd2MTMuNThoLTE0LjM5IGMtMS42MiwxMC4xMy02LjQyLDE5LjItMTMuMzYsMjYuMTNjLTcuMTEsNy4xMS0xNi40NywxMS45OS0yNi45MSwxMy40OHYxNS4wNEg1NC42NXYtMTUuMDRjLTEwLjQ0LTEuNDktMTkuNzktNi4zNi0yNi45LTEzLjQ4IGMtNi45NC02Ljk0LTExLjc0LTE2LTEzLjM2LTI2LjEzSDBWNTQuNjVoMTQuMTZjMS4zNS0xMC43NSw2LjI5LTIwLjM5LDEzLjU4LTI3LjY4YzcuMTEtNy4xMSwxNi40Ni0xMS45OSwyNi45LTEzLjQ4VjBoMTMuNTggVjEzLjQ5TDY4LjIzLDEzLjQ5eiBNNjEuNDQsMzUuNDFjMTMuOTUsMCwyNS4yNSwxMS4zMSwyNS4yNSwyNS4yNWMwLDEzLjk1LTExLjMxLDI1LjI1LTI1LjI1LDI1LjI1IGMtMTMuOTUsMC0yNS4yNS0xMS4zMS0yNS4yNS0yNS4yNUMzNi4xOSw0Ni43Miw0Ny40OSwzNS40MSw2MS40NCwzNS40MUw2MS40NCwzNS40MXogTTg5LDMzLjExYy03LjA1LTcuMDUtMTYuOC0xMS40Mi0yNy41Ni0xMS40MiBjLTEwLjc2LDAtMjAuNTEsNC4zNi0yNy41NiwxMS40MmMtNy4wNSw3LjA1LTExLjQyLDE2LjgtMTEuNDIsMjcuNTZjMCwxMC43Niw0LjM2LDIwLjUxLDExLjQyLDI3LjU2IGM3LjA1LDcuMDUsMTYuOCwxMS40MiwyNy41NiwxMS40MmMxMC43NiwwLDIwLjUxLTQuMzYsMjcuNTYtMTEuNDJjNy4wNS03LjA1LDExLjQyLTE2LjgsMTEuNDItMjcuNTYgQzEwMC40MSw0OS45LDk2LjA1LDQwLjE2LDg5LDMzLjExTDg5LDMzLjExeiIvPjwvZz48L3N2Zz4=");
          background-size: 20px;
          background-repeat: no-repeat;
          background-position: center;
        }
      `}
      </style>
      <Grid
        gridTemplateColumns={{ base: "auto", md: "1fr 1fr" }}
        gap={3}
        key={field.id}
      >
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
              style={{
                height: "300px",
                // child style
              }}
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
              />
            </MapContainer>
          )}
        />
      </Grid>
    </>
  );
};

export default SimpleLocationFormatInput;
