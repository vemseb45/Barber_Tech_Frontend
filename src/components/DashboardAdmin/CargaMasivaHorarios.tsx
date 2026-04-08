import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Upload, Download, CheckCircle2, AlertCircle, X } from "lucide-react";
import api from "../../api/axios";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const CargaMasivaHorarios: React.FC<Props> = ({ isOpen, onClose }) => {
    const [archivo, setArchivo] = useState<File | null>(null);
    const [mensaje, setMensaje] = useState<any>(null);
    const [cargando, setCargando] = useState(false);

    const [preview, setPreview] = useState<any[]>([]);
    const [errores, setErrores] = useState<any[]>([]);

    const [dragActive, setDragActive] = useState(false);

    if (!isOpen) return null;

    const descargarPlantilla = () => {
        const data = [
            {
                cedula_barbero: "",
                dia: "Lunes",
                hora_inicio: "08:00",
                hora_fin: "17:00",
            },
        ];

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Horarios");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        saveAs(blob, "plantilla_horarios.xlsx");
    };

    const procesarArchivo = (file: File) => {
        setArchivo(file);
        setMensaje(null);

        const reader = new FileReader();

        reader.onload = (evt: any) => {
            const data = new Uint8Array(evt.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { raw: false });

            const convertirHora = (valor: any) => {
                // Si viene como número (formato Excel)
                if (typeof valor === "number") {
                    const totalSegundos = Math.round(valor * 24 * 60 * 60);
                    const horas = Math.floor(totalSegundos / 3600);
                    const minutos = Math.floor((totalSegundos % 3600) / 60);

                    return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}`;
                }

                // Si ya viene bien (string)
                return valor;
            };

            // 🔥 MAPEAR Y CORREGIR HORAS
            const jsonDataFormateado = jsonData.map((row) => ({
                ...row,
                hora_inicio: convertirHora(row.hora_inicio),
                hora_fin: convertirHora(row.hora_fin),
            }));

            const erroresTemp: any[] = [];

            jsonDataFormateado.forEach((row, index) => {
                if (!row.cedula_barbero) {
                    erroresTemp.push({ fila: index + 2, error: "Falta cédula" });
                }
                if (!row.dia) {
                    erroresTemp.push({ fila: index + 2, error: "Falta día" });
                }
                if (!row.hora_inicio) {
                    erroresTemp.push({ fila: index + 2, error: "Falta hora inicio" });
                }
                if (!row.hora_fin) {
                    erroresTemp.push({ fila: index + 2, error: "Falta hora fin" });
                }
            });

            setPreview(jsonDataFormateado);
            setErrores(erroresTemp);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) procesarArchivo(file);
    };

    const subirExcel = async () => {
        if (!archivo) {
            setMensaje({ type: "error", text: "Selecciona un archivo primero" });
            return;
        }

        if (errores.length > 0) {
            setMensaje({ type: "error", text: "Corrige los errores antes de subir" });
            return;
        }

        setCargando(true);
        setMensaje(null);

        try {
            const res = await api.post("agenda/carga-masiva/", {
                horarios: preview,
            });

            const { creados, actualizados, errores: erroresBackend } = res.data;

            // ✅ MENSAJE PRO
            setMensaje({
                type: "success",
                text: `✔ ${creados} creados | 🔄 ${actualizados} actualizados`
            });

            // ⚠️ SI HAY ERRORES DEL BACKEND
            if (erroresBackend && erroresBackend.length > 0) {
                setErrores(erroresBackend);
            }

            // 🧹 LIMPIAR
            setArchivo(null);
            setPreview([]);

        } catch (error: any) {
            setMensaje({
                type: "error",
                text: error.response?.data?.message || "Error al subir el archivo",
            });
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">

            <div className="bg-white dark:bg-[#1e293b] w-full max-w-2xl rounded-[32px] shadow-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden">

                {/* HEADER */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                            Carga Masiva de Horarios
                        </h3>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                            Subir horarios en lote mediante Excel
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-500 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* CONTENIDO */}
                <div className="p-6 space-y-6">

                    {/* BOTONES */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={descargarPlantilla}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition shadow"
                        >
                            <Download size={16} /> Descargar plantilla
                        </button>

                        <button
                            onClick={subirExcel}
                            disabled={cargando}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition shadow disabled:opacity-50"
                        >
                            {cargando ? "Subiendo..." : "Subir horarios"}
                        </button>
                    </div>

                    {/* DRAG & DROP SOLO SI NO HAY PREVIEW */}
                    {preview.length === 0 && (
                        <div
                            onClick={() => document.getElementById("fileInput")?.click()}
                            onDragEnter={() => setDragActive(true)}
                            onDragLeave={() => setDragActive(false)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                setDragActive(false);
                                const file = e.dataTransfer.files[0];
                                if (file) procesarArchivo(file);
                            }}
                            className={`w-full border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer
              ${dragActive
                                    ? "border-primary bg-primary/10 scale-[1.02]"
                                    : "border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                                }`}
                        >
                            <Upload size={32} className="mx-auto mb-3 text-slate-400" />

                            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                                Arrastra tu archivo Excel aquí
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                                o haz click para seleccionar
                            </p>

                            <input
                                id="fileInput"
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={handleFile}
                                className="hidden"
                            />
                        </div>
                    )}

                    {/* BOTÓN CAMBIAR ARCHIVO */}
                    {preview.length > 0 && (
                        <button
                            onClick={() => {
                                setArchivo(null);
                                setPreview([]);
                                setErrores([]);
                                setMensaje(null);
                            }}
                            className="text-xs font-bold text-primary hover:underline"
                        >
                            Cambiar archivo
                        </button>
                    )}

                    {/* ARCHIVO */}
                    {archivo && (
                        <div className="text-sm text-slate-500 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border">
                            📄 Archivo cargado: <strong>{archivo.name}</strong>
                        </div>
                    )}

                    {/* PREVIEW */}
                    {preview.length > 0 && (
                        <div>
                            <h4 className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">
                                Vista previa
                            </h4>

                            <div className="max-h-64 overflow-auto rounded-xl border border-slate-200 dark:border-slate-700">
                                <table className="w-full text-xs">
                                    <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0">
                                        <tr className="text-slate-500 uppercase text-[10px]">
                                            <th className="p-2">Cédula</th>
                                            <th className="p-2">Día</th>
                                            <th className="p-2">Inicio</th>
                                            <th className="p-2">Fin</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {preview.map((row, i) => (
                                            <tr key={i} className="text-center border-t hover:bg-slate-50 dark:hover:bg-slate-800">
                                                <td className="p-2 font-medium">{row.cedula_barbero}</td>
                                                <td className="p-2">{row.dia}</td>
                                                <td className="p-2">{row.hora_inicio}</td>
                                                <td className="p-2">{row.hora_fin}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ERRORES */}
                    {errores.length > 0 && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl">
                            <h4 className="text-sm font-bold text-red-600 mb-2">
                                ⚠️ Errores encontrados
                            </h4>

                            <div className="space-y-1 text-xs text-red-600">
                                {errores.map((e, i) => (
                                    <p key={i}>
                                        Fila <strong>{e.fila}</strong>: {e.error}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* MENSAJE */}
                    {mensaje && (
                        <div className={`p-4 rounded-xl flex items-center gap-2 text-sm font-bold ${mensaje.type === "success"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30"
                            }`}>
                            {mensaje.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                            {mensaje.text}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default CargaMasivaHorarios;