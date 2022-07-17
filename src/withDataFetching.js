import React from 'react';

// withDataFetching은...
// props를 인자로 받아서...
// WrappedComponent을 인자로 받는 함수를...
// 리턴하는 함수이다...
// 존나 헷갈리게 해놨네
const withDataFetching = props => WrappedComponent => {
  class WithDataFetching extends React.Component {
    constructor() {
      super();
      this.state = {
        data: [],
        loading: false,
        error: '',
      };
    }

    async componentDidMount() {
      try {
        const data = await fetch(props.dataSource);
        const dataJSON = await data.json();
        console.log(dataJSON);

        if (dataJSON) {
          this.setState({
            data: dataJSON,
            loading: false,
          });
        }
      } catch (error) {
        this.setState({
          loading: false,
          error: error.message,
        });
      }
    }

    render() {
      const { data, loading, error } = this.state;

      return (
        <WrappedComponent
          data={data}
          loading={loading}
          error={error}
          {...this.props}
        />
      );
    }
  }

  WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`;

  return WithDataFetching;
};

export default withDataFetching;
