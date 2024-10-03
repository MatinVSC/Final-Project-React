import { useForm } from "react-hook-form";
import { useCreateCabin } from "../../hooks/useCreateCabin";
import { useEditCabin } from "../../hooks/useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";


function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState


  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) editCabin({ newCabinData: { ...data, image }, id: editId },
      {
        onSuccess: (data) => {
          reset();
          onCloseModal?.();
        },
      }
    );
    else createCabin({ ...data, image: image },
      {
        onSuccess: (data) => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  function onError(errors) {
    console.log('Failed validation!', errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label='Cabin name'
        error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required'
          })} />
      </FormRow>

      <FormRow label='MaxCapacity'
        error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register('maxCapacity', {
          required: 'This feild is required',
          min: {
            value: 1,
            message: 'Capacity should be at least 1',
          }
        })} />
      </FormRow>

      <FormRow label='RegularPrice'
        error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isWorking} {...register('regularPrice', {
          required: 'This feild is required',
          min: {
            value: 1,
            message: 'Capacity should be at least 1',
          }
        })} />
      </FormRow>

      <FormRow label='Discount'
        error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isWorking} defaultValue={0} {...register('discount', {
          required: 'This feild is required',
          validate: (value) => getValues().regularPrice >= value || 'Discount should be less then regular price'
        })} />
      </FormRow>

      <FormRow label='Description for website'
        error={errors?.description?.message}>
        <Textarea type="number" id="description" disabled={isWorking} defaultValue="" {...register('description', { required: 'This feild is required' })} />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput id="image" accept="image/*"
          {...register('image', { required: isEditSession ? false : 'This feild is required' })} />
      </FormRow>

      <FormRow>
        <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Add cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
