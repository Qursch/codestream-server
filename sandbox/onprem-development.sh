
# use for local development sandboxes using mongo for its configuration

# export CS_API_DEFAULT_CFG_FILE=$CSBE_TOP/api_server/etc/configs/open-development.json
export CSBE_API_DEFAULT_PORT=12000  # this needs to agree with the cfg in the file or db
export CSSVC_CFG_URL=mongodb://localhost/codestream

. $CSBE_TOP/sandbox/defaults.sh
