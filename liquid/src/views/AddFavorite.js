import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';
import { uploadFavorite } from '../hooks/ApiHooks';
import {    Grid,
            Button,
            TextField,
            CircularProgress } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Backbutton from '../components/Backbutton';
import { MediaContext } from '../contexts/MediaContext';

const AddFavorite = ({ history }) => {
    const [user] = useContext(MediaContext);
    const [loading, setLoading] = useState(false); 
    const tag = 'liquidfavorite_' + user.user_id;
    const doUpload = async () => {
        setLoading(true);
        console.log('inputs', inputs);
        try {
            const uploadObject = {
                title: inputs.title,
                description: JSON.stringify ({
                    desc: inputs.description,
                }),
                file: inputs.file,
            };
            const result = await 
            uploadFavorite(uploadObject, localStorage.getItem('token'), tag);
            console.log(result);
            setTimeout(() => {
                setLoading(false);
                history.push('/profile');
            }, 2000);
        } catch (e) {
            console.log(e.message);
        }
    };

    const { inputs, setInputs, handleInputChange, handleSubmit, handleFileChange } = useUploadForm(doUpload);

    useEffect(() => {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            setInputs((inputs) => {
                return {
                    ...inputs,
                    dataUrl: reader.result,
                };
            });
        }, false);
        if (inputs.file !== null) {
            if(inputs.file.type.includes('image')) {
            reader.readAsDataURL(inputs.file);
            } else {
                setInputs((inputs) => {
                    return {
                        ...inputs,
                        dataUrl: 'https://marketingsmokeandmirrors.files.wordpress.com/2018/07/shutterstock_142333726b.jpg?w=300&h=225',
                    };
                });
            }
        }

    }, [inputs.file, setInputs]);

    return (
      <>
        <Backbutton />
        <Grid container spacing={8}>
          <Grid item>
            <h1>Add Favorite Game</h1>
          </Grid>
          <Grid item xs={12}>
            <ValidatorForm
              onSubmit={handleSubmit}
              instantValidate={false}
              noValidate
            >
              <Grid container spacing={3}>
                {inputs.dataUrl.length > 0 && (
                  <Grid item xs={12}>
                    <img
                      class="previewImg"
                      src={inputs.dataUrl}
                      alt="preview"
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextValidator
                    label="Title"
                    fullWidth
                    type="text"
                    name="title"
                    value={inputs.title}
                    onChange={handleInputChange}
                    validators={["required"]}
                    errormessage={["this field is required, biz"]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Description"
                    name="description"
                    value={inputs.description}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    defaultValue="Description"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    fullWidth
                    type="file"
                    name="file"
                    accept="image/*,video/*,audio/*"
                    onChange={handleFileChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    Add to Profile
                  </Button>
                </Grid>
              </Grid>
            </ValidatorForm>
            {loading && (
              <Grid item xs={12}>
                <CircularProgress color="secondary" />
              </Grid>
            )}
          </Grid>
        </Grid>
      </>
    );
}

AddFavorite.propTypes = {
    history: PropTypes.object,
};

export default AddFavorite;

