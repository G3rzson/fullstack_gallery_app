import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  galeryTitleFormSchema,
  type GaleryTitleFormType,
} from "../ZodSchemas/GaleryTitleFormSchema";
import toast from "react-hot-toast";
import { handleAxiosError } from "../Utils/handleAxiosError";
import InputField from "../Components/GlobalComponents/InputField";
import InputError from "../Components/GlobalComponents/InputError";
import SubmitBtn from "../Components/GlobalComponents/SubmitBtn";
import { FaCheck, FaFolderPlus } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGaleryTitle from "../Hooks/useGaleryTitle";
import { useEffect, useRef } from "react";
import ErrorMsg from "../Components/GlobalComponents/ErrorMsg";
import Loader from "../Components/GlobalComponents/Loader";
import EmptyData from "../Components/GlobalComponents/EmptyData";
import { useGaleryTitleGetOne } from "../Hooks/useGaleryTitleGetOne";

export default function GaleryTitlePage() {
  const { pathname } = useLocation();
  const galeryTitleID = useParams().id;
  const isUpdateMode = pathname.includes("update") && !!galeryTitleID;

  const { data, isLoading, isError, error } = useGaleryTitleGetOne(
    isUpdateMode ? galeryTitleID : undefined
  );

  const editingGaleryTitleObj = isUpdateMode ? data?.data : undefined;

  const navigate = useNavigate();
  const { mutateAsync, isPending } = useGaleryTitle(
    isUpdateMode ? "update" : "create",
    isUpdateMode ? galeryTitleID : undefined
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GaleryTitleFormType>({
    resolver: zodResolver(galeryTitleFormSchema),
    defaultValues: {
      galeryTitle: "",
      isPrivate: false,
    },
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isUpdateMode) {
      reset({
        galeryTitle: "",
        isPrivate: false,
      });
    }
  }, [isUpdateMode, reset]);

  useEffect(() => {
    if (editingGaleryTitleObj) {
      reset({
        galeryTitle: editingGaleryTitleObj.galeryTitle,
        isPrivate: editingGaleryTitleObj.isPrivate,
      });
    }
  }, [editingGaleryTitleObj, reset]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    input.focus();
    const length = input.value.length;
    input.setSelectionRange(length, length);
  }, [editingGaleryTitleObj]);

  async function onSubmit(data: GaleryTitleFormType) {
    try {
      const res = await mutateAsync(data);
      if (res.success) {
        if (isUpdateMode) {
          navigate("/my-galery-titles");
        } else {
          navigate(`/galery/${res.data?.url}`);
        }
        toast.success(
          res.message ??
            (isUpdateMode ? "Galéria frissítve!" : "Galéria létrehozva!")
        );
        reset();
      }
    } catch (error) {
      toast.error(handleAxiosError(error));
    }
  }

  if (isUpdateMode) {
    if (isError) return <ErrorMsg error={error} />;

    if (isLoading) return <Loader />;

    if (!editingGaleryTitleObj)
      return <EmptyData text={"Még nincsenek elérhető galériák!"} />;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-3xl">
        Galéria {isUpdateMode ? "szerkesztése" : "létrehozása"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 dark:bg-zinc-900 bg-zinc-200 rounded-lg sm:w-80 w-full mx-auto p-4"
      >
        <div className="relative">
          <InputField
            inputRef={inputRef}
            register={register}
            registerName="galeryTitle"
            type="text"
            title="Galéria címe"
            disabled={isPending}
          />

          <InputError errorMsg={errors["galeryTitle"]?.message} />
        </div>

        <div className="flex items-center gap-2">
          <input
            {...register("isPrivate")}
            className="cursor-pointer"
            type="checkbox"
            id="isPrivate"
          />
          <label className="cursor-pointer select-none" htmlFor="isPrivate">
            Legyen privát.
          </label>
        </div>

        <SubmitBtn disabled={isPending} ariaLabel="Űrlap beküldése">
          {isUpdateMode ? (
            <>
              Mentés <FaCheck />
            </>
          ) : (
            <>
              Létrehozás <FaFolderPlus />
            </>
          )}
        </SubmitBtn>
      </form>
    </div>
  );
}
