"use client";
import { useAuth } from "@/app/context/authContext";
import {
  errorMessage,
  productSuccesfullyAdded,
} from "@/app/utils/toast/toastMessages";
import Divider from "@/components/Divider";
import ButtonAddToCart from "@/components/inputs/ButtonAddToCart";
import SelectorQuantity from "@/components/inputs/SelectorQuantity";
import { addToCart, getProductById } from "@/lib/graphql";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
  createPregunta,
  getPreguntasByProductId,
  getPersonById,
} from "@/lib/graphql";

export default function page() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState();
  const { slug } = useParams();
  const { user } = useAuth();

  //para las preguntas
  const [preguntas, setPreguntas] = useState([]);
  const [nuevaPregunta, setNuevaPregunta] = useState("");
  const [userName, setNombresUsuarios] = useState({});

  const getUsername = async (id_persona) => {
    if (!id_persona);

    try {
      const persona = await getPersonById({ id_persona });

      // Verificación completa de la respuesta
      if (!persona || typeof persona !== "object") {
        console.error("Respuesta inválida de getPersonById:", persona);
        return `Usuario ${id_persona}`;
      }

      const nombre = persona.nombre || "";
      const apellido = persona.apellido || "";

      return `${nombre} ${apellido}`.trim() || `Usuario ${id_persona}`;
    } catch (error) {
      console.error(`Error al obtener usuario ${id_persona}:`, error);
      return `Usuario ${id_persona}`;
    }
  };

  useEffect(() => {
    const loadUsername = async () => {
      const uniqueUser = [
        ...new Set(
          preguntas.filter((p) => p?.id_persona).map((p) => p.id_persona)
        ),
      ];

      const newName = {};

      await Promise.all(
        uniqueUser.map(async (userId) => {
          if (!userName[userId]) {
            newName[userId] = await getUsername(userId);
          }
        })
      );

      if (Object.keys(newName).length > 0) {
        setNombresUsuarios((prev) => ({ ...prev, ...newName }));
      }
    };

    loadUsername();
  }, [preguntas]);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await getPreguntasByProductId({
          id_ps: parseInt(slug),
        });
        if (Array.isArray(response)) {
          setPreguntas(response.filter((p) => p !== null));
        }
      } catch (error) {
        console.error("Error fetching preguntas:", error);
      }
    };
    fetchPreguntas();
  }, [slug]);

  const handleEnviarPregunta = async () => {
    if (!nuevaPregunta.trim()) {
      errorMessage("La pregunta no puede estar vacía");
      return;
    }

    if (!user?.id_persona) {
      errorMessage("Debes iniciar sesión para preguntar");
      return;
    }

    try {
      const result = await createPregunta({
        description: nuevaPregunta.trim(),
        personId: user.id_persona,
        productId: parseInt(slug),
      });

      // Si la creación fue exitosa
      if (result?.data?.createPregunta) {
        // Agrega la nueva pregunta al inicio del listado
        setPreguntas((prev) => [result.data.createPregunta, ...prev]);
        setNuevaPregunta("");
        console.log("Pregunta enviada correctamente");
      }
    } catch (error) {
      console.error("Error al crear pregunta:", error.message);
      errorMessage(error.message || "Error al enviar la pregunta");
    }
  };

  useEffect(() => {
    const fetchProductById = async () => {
      const response = await getProductById({ id_ps: parseInt(slug) });
      setProduct(response);
    };
    fetchProductById();
  }, []);

  const handleAddToCart = async () => {
    const productPrice = product.precio;
    const subtotal = productPrice * quantity;
    const newProduct = {
      quantity: quantity,
      id_cart: parseInt(user.id_persona),
      subtotal: subtotal,
      id_ps: parseInt(slug),
    };

    const response = await addToCart(newProduct);

    if (response) {
      productSuccesfullyAdded(router);
    } else {
      errorMessage(
        "Algo ocurrió al intentar agregar el item al carrito. Por favor, intenta nuevamente"
      );
    }
  };

  const renderEditButton = (id_ps) => {
    if (user && user.tipo) {
      return (
        <div className="p-4">
          <button
            type="button"
            onClick={() => router.push(`/editar-producto/${id_ps}`)}
            className="bg-lightgreen font-bold text-white px-4 py-2 rounded-md cursor-pointer h-max"
          >
            Editar Producto
          </button>
        </div>
      );
    }
  };
  return (
    <div className="flex justify-around">
      <div className="p-8">
        {product ? (
          <div className="flex gap-4">
            <div className="flex flex-col gap-8">
              <img
                src={product.image || "/productImage.png"}
                alt={product.nombre}
                className="w-full h-48 object-contain rounded"
              />
              <Divider />

              <div className="flex flex-col gap-4">
                <p>Precio: ${product.precio}</p>
                <div className="flex items-center gap-4">
                  <p>Seleccione una cantidad</p>
                  <SelectorQuantity
                    setQuantity={setQuantity}
                    quantity={quantity}
                  />
                </div>

                <ButtonAddToCart handleClick={handleAddToCart} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">{product.nombre}</h1>
              <p>{product.descripcion}</p>
            </div>
            <div className="mt-12 border-t pt-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Preguntas sobre este producto
              </h2>

              {preguntas.length > 0 ? (
                <ul className="space-y-4">
                  {preguntas
                    .filter((p) => p !== null && p !== undefined)
                    .map((p, i) => (
                      <li
                        key={p.id_preguntas ?? i}
                        className="bg-gray-50 p-4 rounded shadow-sm border"
                      >
                        <p className="text-gray-700">
                          <span className="font-semibold text-blue-600">
                            {userName[p.id_persona] || `Cargando...`}:
                          </span>{" "}
                          {p.descripcion}
                        </p>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  Aún no hay preguntas sobre este producto.
                </p>
              )}

              <div className="mt-8 flex flex-col md:flex-row gap-4 items-start">
                <input
                  type="text"
                  value={nuevaPregunta}
                  onChange={(e) => setNuevaPregunta(e.target.value)}
                  placeholder="Escribí tu pregunta"
                  className="w-full md:flex-1 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleEnviarPregunta}
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                >
                  Enviar pregunta
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Cargando producto...</p>
        )}
      </div>
      {renderEditButton(product?.id_ps)}
    </div>
  );
}
