import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
      reset()
    },
    onError: err => toast.error(err.message)
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onError() {

  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

      <FormRow lable='Cabin name'
        error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register('name', {
            required: 'This field is required'
          })} />
      </FormRow>

      <FormRow lable='MaxCapacity'
        error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isLoading} {...register('maxCapacity', {
          required: 'This feild is required',
          min: {
            value: 1,
            message: 'Capacity should be at least 1',
          }
        })} />
      </FormRow>

      <FormRow lable='RegularPrice'
        error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isLoading} {...register('regularPrice', {
          required: 'This feild is required',
          min: {
            value: 1,
            message: 'Capacity should be at least 1',
          }
        })} />
      </FormRow>

      <FormRow lable='Discount'
        error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isLoading} defaultValue={0} {...register('discount', {
          required: 'This feild is required',
          validate: (value) => getValues().regularPrice >= value || 'Discount should be less then regular price'
        })} />
      </FormRow>

      <FormRow lable='Description for website'
        error={errors?.description?.message}>
        <Textarea type="number" id="description" disabled={isLoading} defaultValue="" {...register('description', { required: 'This feild is required' })} />
      </FormRow>

      <FormRow lable='Cabin photo'>
        <FileInput id="image" accept="image/*"
          {...register('image', { required: 'This feild is required' })} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
