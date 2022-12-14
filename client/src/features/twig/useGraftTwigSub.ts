import { gql, useReactiveVar, useSubscription } from '@apollo/client';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { IdToType } from '../../types';
import { Arrow } from '../arrow/arrow';
import { selectSessionId } from '../auth/authSlice';
import { PosType, SpaceType } from '../space/space';
import { mergeIdToPos } from '../space/spaceSlice';
import { mergeTwigs } from './twigSlice';

const GRAFT_TWIG_SUB = gql`
  subscription GraftTwig($sessionId: String!, $abstractId: String!) {
    graftTwig(sessionId: $sessionId, abstractId: $abstractId) {
      twig {
        id
        x
        y
        parent {
          id
        }
      }
      descs {
        id
        x
        y
      }
    }
  }
`;

export default function useGraftTwigSub(space: SpaceType, abstract: Arrow | null) {
  const dispatch = useAppDispatch();

  const sessionId = useAppSelector(selectSessionId);

  useSubscription(GRAFT_TWIG_SUB, {
    variables: {
      sessionId,
      abstractId: abstract?.id,
    },
    onSubscriptionData: ({subscriptionData: {data: {graftTwig}}}) => {
      console.log(graftTwig);

      const { twig, descs } = graftTwig;
      dispatch(mergeTwigs({
        space,
        twigs: [twig, ...descs],
      }))

      dispatch(mergeIdToPos({
        space,
        idToPos: [twig, ...descs].reduce((acc: IdToType<PosType>, twig) => {
          acc[twig.id] = { 
            x: twig.x, 
            y: twig.y
          };
          return acc;
        }, {}),
      }))
    },
  });
}